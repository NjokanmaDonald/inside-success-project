"use client";

import { useAuth } from "@/app/context/authContext";
import VoteOptions from "./VoteOptions";
import VoteResults from "./VoteResults";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { joinRoom } from "@/app/lib/apiCalls/decisionRoom";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
  room: {
    id: string;
    title: string;
    description: string;
    votingOptions: string[];
    createdById: string;
    deadline: string;
    roomMembership: {
      id: string;
      userId: string;
      decisionRoomId: string;
    }[];
  };
};

export default function RoomContent({ room }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [formattedDeadline, setFormattedDeadline] = useState("");

  const onClickJoin = async () => {
    if (user?.id) {
      try {
        const res = await joinRoom({
          userId: user.id,
          decisionRoomId: room.id,
        });
        toast.success("You joined the room");
        router.push("/rooms");
        if (!res.success) {
          throw new Error(res.error || "Vote failed");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to join the room.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (room.deadline) {
      const date = new Date(room.deadline);
      setFormattedDeadline(date.toLocaleString());
    }
  }, [room.deadline]);

  useEffect(() => {
    if (user?.id && room.createdById === user.id) {
      setIsOwner(true);
    }
  }, [user, room.createdById]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {room.title}
          </h1>
          <p className="text-gray-600 mb-2">{room.description}</p>
          <p className="text-gray-600">
            Deadline for voting: {formattedDeadline}
          </p>
        </div>
        {isOwner ? (
          <button
            className="bg-gray-400 p-2 text-white rounded cursor-pointer"
            onClick={() => {
              const roomLink = `${window.location.origin}/rooms/${room.id}`;
              navigator.clipboard
                .writeText(roomLink)
                .then(() => toast.success("Room link copied!"))
                .catch(() => toast.error("Failed to copy link"));
            }}
          >
            Copy Room Link
          </button>
        ) : (
          <div>
            {user?.id &&
              !room.roomMembership.some(
                (member) => member.userId === user.id
              ) && (
                <button
                  className="bg-gray-400 p-2 text-white rounded cursor-pointer "
                  onClick={onClickJoin}
                >
                  {loading ? <>Loading...</> : <>Join Room</>}
                </button>
              )}
          </div>
        )}
      </div>

      {isOwner && <VoteResults roomId={room.id} />}
      <VoteOptions roomId={room.id} options={room.votingOptions} />
    </>
  );
}

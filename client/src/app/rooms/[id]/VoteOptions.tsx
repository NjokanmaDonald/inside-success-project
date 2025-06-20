"use client";

import { useAuth } from "@/app/context/authContext";
import { castVote } from "@/app/lib/apiCalls/vote";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  roomId: string;
  options: string[];
};

export default function VoteOptions({ roomId, options }: Props) {
  const { user, unregisteredUserId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);

  useEffect(() => {
    const id = user?.id || unregisteredUserId;
    if (id) {
      const key = `voted_${id}_${roomId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        setVotedOption(stored);
      } else {
        setVotedOption(null);
      }
    }
  }, [user?.id, unregisteredUserId, roomId]);

  const onVoteClick = async (option: string) => {
    const id = user?.id || unregisteredUserId;

    if (!id) {
      toast.error("User not identified");
      return;
    }

    if (votedOption) {
      toast.error("You’ve already voted.");
      return;
    }

    setLoading(true);
    try {
      const res = await castVote({
        userId: user?.id || null,
        unregisteredUserId: !user?.id ? unregisteredUserId : null,
        decisionRoomId: roomId,
        votingOption: option,
      });

      if (!res.success) {
        throw new Error(res.error || "Vote failed");
      }
      const key = `voted_${id}_${roomId}`;
      localStorage.setItem(key, option);
      setVotedOption(option);
      toast.success("Vote cast successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to cast vote.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {options?.map((option) => {
        const isVoted = votedOption === option;
        const isDisabled = votedOption !== null;

        return (
          <div
            key={option}
            className={`p-3 rounded transition ${
              isVoted
                ? "bg-green-200 text-black cursor-not-allowed"
                : isDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
            }`}
            onClick={() => {
              if (!isDisabled) onVoteClick(option);
            }}
          >
            {option}
          </div>
        );
      })}

      {loading && <p className="text-sm text-blue-600">Submitting vote...</p>}
      {votedOption && !loading && (
        <p className="text-sm text-green-600">
          You voted for: <strong>{votedOption}</strong>
        </p>
      )}
    </div>
  );
}

"use client";
import { useAuth } from "@/app/context/authContext";
import { createComment } from "@/app/lib/apiCalls/comment";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReplyForm({ roomId }: { roomId: string }) {
  const { user, unregisteredUserId } = useAuth();
  let userName;
  if (user) {
    userName = `${user.firstName} ${user.lastName}`;
  } else {
    userName = `annonymous_${unregisteredUserId}`;
  }
  const [comment, setComment] = useState("");

  const handleSubmitComment = async () => {
    try {
      const res = await createComment({
        decisionRoomId: roomId,
        user: userName,
        comment,
      });
      toast.success("comment created successfully");
      if (!res.success) {
        throw new Error(res.error || "Comment failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit comment.");
      }
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmitComment}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border border-gray-300 rounded px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </form>
  );
}

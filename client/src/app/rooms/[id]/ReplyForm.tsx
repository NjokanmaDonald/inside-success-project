"use client";
import { useAuth } from "@/app/context/authContext";
import { createReply } from "@/app/lib/apiCalls/reply";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReplyForm({ commentId }: { commentId: string }) {
  const { user, unregisteredUserId } = useAuth();
  let userName;
  if (user) {
    userName = `${user.firstName} ${user.lastName}`;
  } else {
    userName = `annonymous_${unregisteredUserId}`;
  }
  const [reply, setReply] = useState("");

  const handleSubmitReply = async () => {
    try {
      const res = await createReply({
        commentId: commentId,
        user: userName,
        reply,
      });
      toast.success("Reply created successfully");
      if (!res.success) {
        throw new Error(res.error || "Vote failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit reply.");
      }
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmitReply}>
      <input
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
        className="w-full border border-gray-300 rounded px-4 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </form>
  );
}

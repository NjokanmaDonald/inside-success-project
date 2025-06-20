import axios from "axios";
import { baseUrl } from "../apiConfig";
import { cache } from "react";

export async function castVote({
  userId,
  unregisteredUserId,
  decisionRoomId,
  votingOption,
}: {
  userId?: string | null;
  unregisteredUserId?: string | null;
  decisionRoomId: string;
  votingOption: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/vote/create`, {
      userId,
      unregisteredUserId,
      decisionRoomId,
      votingOption,
    });

    return {
      success: true,
      data: res,
      message: "Vote cast successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        message: "",
        error: error.response?.data?.message || error.message,
      };
    }
    return {
      message: "",
      error: "An unexpected error occurred",
    };
  }
}

export const getVoteResults = cache(async (decisionRoomId: string) => {
  const response = await axios.get(`${baseUrl}/vote/stats/${decisionRoomId}`);
  return response.data;
});

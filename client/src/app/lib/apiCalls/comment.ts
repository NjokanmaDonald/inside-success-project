import axios from "axios";
import { baseUrl } from "../apiConfig";
import { cache } from "react";

export async function createComment({
  decisionRoomId,
  user,
  comment,
}: {
  decisionRoomId: string;
  user: string;
  comment: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/comment/create`, {
      decisionRoomId,
      user,
      comment,
    });
    return {
      success: true,
      data: res,
      message: "Comment created successfully",
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

export const getComments = cache(async (roomId: string) => {
  const res = await axios.get(`${baseUrl}/comment/get/${roomId}`);
  return res.data.data;
});

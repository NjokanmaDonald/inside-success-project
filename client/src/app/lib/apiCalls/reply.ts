import axios from "axios";
import { baseUrl } from "../apiConfig";

export async function createReply({
  commentId,
  user,
  reply,
}: {
  commentId: string;
  user: string;
  reply: string;
}) {
  try {
    const res = await axios.post(`${baseUrl}/reply/create`, {
      commentId,
      user,
      reply,
    });
    return {
      success: true,
      data: res,
      message: "Reply created successfully",
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

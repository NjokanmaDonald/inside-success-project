import axios from "axios";
import { baseUrl } from "../apiConfig";
import { login, registration } from "@/app/types";

export async function registerUser(
  prevState: registration,
  formData: FormData
) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return {
      message: "",
      error: "Passwords do not match",
    };
  }

  try {
    const res = await axios.post(`${baseUrl}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    return {
      message: "User created successfully",
      user: res.data,
      error: "",
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

export async function userLogin(prevState: login, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });

    return {
      message: "Login successful",
      user: res.data.data,
      error: "",
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

"use client";

import { useActionState, useEffect } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/apiCalls/auth";

const initialState = {
  message: "",
  error: "",
};

export function RegisterationForm() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );
  const router = useRouter();

  const inputData = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  useEffect(() => {
    if (state?.message === "User created successfully") {
      router.push("/login");
    }
  }, [state]);

  useEffect(() => {
    if (state.message) toast.success(state.message);
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center gap-3"
    >
      {inputData.map((data) => (
        <div key={data.name}>
          <label htmlFor={data.name}></label>
          <input
            type={data.type}
            id={data.name}
            name={data.name}
            placeholder={data.placeholder}
            className="border border-border text-black bg-transparent placeholder-black px-4 py-2 rounded"
          />
        </div>
      ))}
      <button
        disabled={isPending}
        className="border p-2 rounded w-40 text-black bg-blue-100 hover:bg-blue-300 hover:cursor-pointer"
      >
        {isPending ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

"use client";

import { useActionState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { userLogin } from "../lib/apiCalls/auth";

const initialState = {
  message: "",
  error: "",
  user: null,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    userLogin,
    initialState
  );

  const inputData = [
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
  ];

  const { login } = useAuth();

  useEffect(() => {
    if (state?.user) {
      login(state.user);
    }
  }, [state.user, login]);

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
            className="border border-black text-black bg-transparent placeholder-black px-4 py-2 rounded"
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

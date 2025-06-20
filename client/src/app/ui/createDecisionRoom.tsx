"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "../lib/apiCalls/decisionRoom";
import toast from "react-hot-toast";

export function CreateDecisionRoom() {
  const [votingOptions, setVotingOptions] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  let token = "";
  const userString =
    typeof window !== "undefined" && localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    token = user.token;
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...votingOptions];
    newOptions[index] = value;
    setVotingOptions(newOptions);
  };

  const addOption = () => setVotingOptions([...votingOptions, ""]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "deadline") {
      const isoDate = new Date(value).toISOString();
      setFormData((prev) => ({
        ...prev,
        [name]: isoDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      votingOptions: votingOptions.filter((opt) => opt.trim() !== ""),
    };

    console.log("Payload being sent:", payload);

    const res = await createRoom(payload, token);

    if (res.success) {
      toast.success(res.message || "Decision room created successfully");
      router.push("/rooms");
    } else {
      toast.error(res.error || "Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a New Decision Room
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={formData.title}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            onChange={handleInputChange}
            value={formData.description}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Voting Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Voting Options
          </label>
          {votingOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 mb-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addOption}
            disabled={isLoading}
            className="text-blue-600 text-sm mt-1 hover:underline"
          >
            + Add another option
          </button>
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            name="deadline"
            id="deadline"
            onChange={handleInputChange}
            value={
              formData.deadline
                ? new Date(formData.deadline).toISOString().slice(0, 16)
                : ""
            }
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2  cursor-pointer rounded hover:bg-blue-700 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {isLoading ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { getDecisonRooms } from "../lib/apiCalls/decisionRoom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

export default function ContentPage() {
  type Group = {
    id: string;
    decisionRoom: {
      id: string;
      title: string;
      description: string;
    };
  };

  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      getDecisonRooms(user.token).then((res) => {
        setGroups(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-600 font-semibold">
          Only registered users can view decision rooms.
        </p>
        <p className="text-gray-500 mt-2">
          Please log in or sign up to access the rooms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for room"
          className="w-full max-w-md border border-black px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map((group: Group) => (
            <Link
              href={`/rooms/${group.decisionRoom.id}`}
              key={group.decisionRoom.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h1 className="text-lg font-semibold text-gray-800">
                {group.decisionRoom.title}
              </h1>
              <p className="text-sm text-gray-500">
                {group.decisionRoom.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

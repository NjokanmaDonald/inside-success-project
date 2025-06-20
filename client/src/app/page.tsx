"use client";

import Image from "next/image";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAuthAction = () => {
    if (user) {
      logout(); // Call logout if user is authenticated
    } else {
      router.push("/login"); // Navigate to sign-in page
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Voting App</div>
        <button
          onClick={handleAuthAction}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <h1 className="mt-6 text-2xl font-semibold">
          {user ? `Welcome, ${user.firstName}` : "Welcome to MyApp"}
        </h1>
      </main>
    </div>
  );
}

import Image from "next/image";
import { RegisterationForm } from "../ui/registerationForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen p-2">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <RegisterationForm />
        <p className="mt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

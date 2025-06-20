import Image from "next/image";
import { LoginForm } from "../ui/loginForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen p-2 overflow-hidden">
      <div className="flex flex-col items-center justify-center ">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <LoginForm />
        <p className="mt-1">
          Don&apos;t have an account?
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center bg-white border-t border-l border-solid border-t-[black] border-l-[black] h-[calc(100vh-44px)] w-screen p-2 rounded mt-11 ml-4">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </div>
    </div>
  );
}

import { getOneDecisionRoom } from "@/app/lib/apiCalls/decisionRoom";
import RoomContent from "./RoomContent";
import CommentForm from "./CommentForm";
import CommentData from "./CommentData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Rooms page",
};

type roomType = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Room({ params }: roomType) {
  const { id } = await params;
  const room = await getOneDecisionRoom(id);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <RoomContent room={room} />

      {/* Comments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        <CommentForm roomId={id} />

        <CommentData roomId={id} />
      </div>
    </div>
  );
}

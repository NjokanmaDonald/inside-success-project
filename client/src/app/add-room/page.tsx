import { Metadata } from "next";
import ProtectedRoute from "../components/ProtectedRoute";
import { CreateDecisionRoom } from "../ui/createDecisionRoom";

export const metadata: Metadata = {
  title: "Add room",
  description: "Add rooms page",
};

export default function AddRoom() {
  return (
    <ProtectedRoute>
      <div>
        <CreateDecisionRoom />
      </div>
    </ProtectedRoute>
  );
}

import { Plus, Settings, UserPen, UsersRound } from "lucide-react";

export const sideBarItems = [
  {
    icon: <UsersRound />,
    name: "Rooms",
    path: "/rooms",
  },
  {
    icon: <Plus />,
    name: "Add room",
    path: "/add-room",
  },
  {
    icon: <Settings />,
    name: "Settings",
    path: "",
  },
  {
    icon: <UserPen />,
    name: "Profile",
    path: "",
  },
];

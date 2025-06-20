import React from "react";
import ContentPage from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Rooms page",
};
const page = () => {
  return (
    <div>
      <ContentPage />
    </div>
  );
};

export default page;

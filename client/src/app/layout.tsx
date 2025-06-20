import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Voting App",
  description: "Created By Donald Njokanma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className="antialiased h-full overflow-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>
          <div className="flex h-full bg-gray-200 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden mt-11 ml-4">
              <div className="bg-white border-t border-l border-black h-full w-full p-4 rounded overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

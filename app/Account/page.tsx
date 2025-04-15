"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a202c] text-white p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-[#00ffc8]">Account Access</h1>
          <p className="text-gray-400 mb-6">
            You must be signed in to view your account details and track your finances.
          </p>
          <Link href="/Signin">
            <button className="bg-[#ff6584] hover:bg-[#ff4b71] px-6 py-2 rounded-md font-semibold transition duration-200">
              Sign In
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const user = session.user;

  const initials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a202c] w-full max-w-lg rounded-2xl shadow-lg p-8"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-[#00ffc8] text-black text-3xl font-bold rounded-full h-20 w-20 flex items-center justify-center shadow-md">
            {initials}
          </div>

          <h2 className="text-2xl font-extrabold">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>

          <div className="w-full mt-6">
            <h3 className="text-lg font-semibold mb-2 text-[#00ffc8]">Account Info</h3>
            <div className="bg-[#2d3748] rounded-lg p-4 space-y-3 border border-[#008369]">
              <div className="flex justify-between">
                <span className="text-gray-400">Full Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user.email}</span>
              </div>
              
            </div>
          </div>

          <button className="mt-6 bg-[#ff6584] hover:bg-[#ff4b71] text-white px-6 py-2 rounded-md font-semibold transition duration-200">
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

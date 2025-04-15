"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Appbar = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [logclick,setlogclick] = useState(false)

  const isAuthenticated = data?.user;

  return (
    <div className=" flex justify-between items-center bg-[#0f1117] text-[#ffffff] p-4 sticky top-0 z-50 w-full shadow-md border-b border-[#1a202c]">
      <div
        className="text-white hover:scale-105 hover:text-[#008369] text-4xl font-bold tracking-tight cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-white">Fin</span>track
      </div>

      <div className="flex gap-3">
        <button
          className={`border-2 border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-black hover:border-s-black transition-all duration-150 ${logclick?"animate-pulse":"animate-none"} hover:rounded-lg`}
          onClick={async () => {
            setlogclick(true)
            if (isAuthenticated) {
              await signOut();
            } else {
              router.push("../Signin");
            }
            setTimeout(() => {
                setlogclick(false)
            }, 1500);
          }}
        >
          {logclick?"Redirecting...":isAuthenticated ? "Logout" : "Login"}
        </button>

        <button
          className="border-2 border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-black hover:border-s-black transition-all duration-150 hover:rounded-lg"
          onClick={() => router.push("../Account")}
        >
          Account
        </button>

        <button
          className="border-2 border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-black hover:border-s-black transition-all duration-150 hover:rounded-lg"
          onClick={() => router.push("../Addtransactions")}
        >
          Add Transactions
        </button>
      </div>
    </div>
  );
};

"use client";

import { useRef, useState } from "react";
import { signinValidation } from "@/app/lib/validation";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInPage() {
  const emailref = useRef<HTMLInputElement>(null);
  const passref = useRef<HTMLInputElement>(null);
  const [redirecting,setredirecting] = useState(false)

  const router = useRouter();

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setredirecting(true)
    const email = emailref.current?.value;
    const password = passref.current?.value;

    const parseddata = signinValidation.safeParse({ email, password });

    if (!parseddata.success) {
      alert("Invalid input. Please check your email and password.");
    } else {
      try {
        const response: AxiosResponse = await axios.post("/api/auth/signin", {
          email,
          password,
        });

        if (response.status == 200) {
          const result = await signIn("credentials", {
            redirect: false,
            userid: response.data.response._id,
            username: response.data.response.username,
            email: response.data.response.email,
            password: response.data.response.password,
          });

          if (result?.error) {
            alert("Authentication failed.");
          } else {
            alert(response.data.msg);
            router.push("../");
          }
        } else {
          alert(response.data.msg);
        }
        setredirecting(false)
      } catch (err) {
        alert("Check your internet connection.");
        setredirecting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#ffffff] flex flex-col md:flex-row items-center justify-around p-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left max-w-md"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-[#008369]">
          Welcome Back {}
        </h1>
        <p className="text-[#d1d5db]">
          Continue tracking your finances with <span className="font-bold text-[#008369]">Fintrack</span>. Smart, simple, and secure.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md bg-[#1a202c] rounded-xl shadow-lg p-8 mt-10 md:mt-0"
      >
        <form onSubmit={register} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#d1d5db]">Email</label>
            <input
              ref={emailref}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d1d5db]">Password</label>
            <input
              ref={passref}
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[#008369] hover:bg-[#00a57f] text-white py-2 px-4 rounded-md font-semibold transition-all duration-200 ${redirecting?"animate-pulse":"animate-none"}`}
          >
            {redirecting?"Signing In...":"Sign In"}
          </button>
        </form>

        <div className="text-sm text-center text-[#a0aec0] mt-6">
          {"Don't have an account?"}
          <Link href="/Signup" className="text-[#008369] hover:underline">
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

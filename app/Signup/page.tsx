"use client";

import { useRef, useEffect, useState } from "react";
import { userValidation } from "@/app/lib/validation";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    name: "Aarav Patel",
    quote: "Fintrack helped me save ₹15,000 in just 3 months! The insights are 🔥",
  },
  {
    name: "Sneha Reddy",
    quote: "I never realized how much I spent on food until I started using Fintrack.",
  },
  {
    name: "Rahul Mehta",
    quote: "Budgeting finally makes sense. Super intuitive and beautifully designed!",
  },
];

export default function SignUpPage() {
  const usernameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);
  const passref = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [redirecting,setredirecting] = useState(false)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setredirecting(true)
    const username = usernameref.current?.value;
    const email = emailref.current?.value;
    const password = passref.current?.value;

    const parseddata = userValidation.safeParse({ username, email, password });

    if (!parseddata.success) {
      alert("Please check all fields for valid values.");
      setredirecting(false)
    } else {
      try {
        const response: AxiosResponse = await axios.post("/api/auth/signup", {
          username,
          email,
          password,
        });

        if (response.status === 200) {
          alert(response.data.msg);
          router.push("../Signin");
        } else {
          alert(response.data.msg);
        }
        setredirecting(false)
      } catch (err) {
        console.log(err);
        alert("Server error. Please try again.");
        setredirecting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex flex-col md:flex-row items-center justify-around p-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left max-w-md"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-[#008369]">
          Create your account
        </h1>

        {/* Testimonials Slideshow */}
        <div className="h-24 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              <p className="text-[#d1d5db] text-lg italic">
                “{testimonials[currentIndex].quote}”
              </p>
              <p className="text-sm mt-1 text-[#00ffc8] font-semibold">
                — {testimonials[currentIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-[#d1d5db] mt-8">
          Start managing your money better with{" "}
          <span className="font-bold text-[#008369]">Fintrack</span> today.
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
            <label className="block text-sm font-medium text-[#d1d5db]">
              Username
            </label>
            <input
              ref={usernameref}
              type="text"
              placeholder="Enter your username(More than 4 letters)"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d1d5db]">
              Email
            </label>
            <input
              ref={emailref}
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d1d5db]">
              Password
            </label>
            <input
              ref={passref}
              type="password"
              placeholder="Enter a strong password"
              required
              className="mt-1 w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[#008369] hover:bg-[#00a57f] text-white py-2 px-4 rounded-md font-semibold transition-all duration-200 ${redirecting?"animate-pulse":"animate-none"}`}
          >
            {redirecting?"Signing up...":"Sign Up"}
          </button>
        </form>

        <div className="text-sm text-center text-[#a0aec0] mt-6">
          Already have an account?{" "}
          <Link href="/Signin" className="text-[#008369] hover:underline">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

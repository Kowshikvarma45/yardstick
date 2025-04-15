"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Display from "@/components/Display";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <div className="animate-pulse text-5xl min-h-screen items-center flex justify-center text-white bg-[#0f1117]">
        Loading...
      </div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className=" bg-[#0f1117] text-[#ffffff]">
        <div className="text-3xl font-bold">
          <Display></Display>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center p-6 text-[#ffffff]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight text-[#ffffff]">
          Welcome to <span className="text-[#008369]">Fintrack</span> 💰
        </h1>
        <p className="text-lg text-[#d1d5db] mb-6">
          Track your expenses, plan budgets, and visualize your financial future with ease.
        </p>
        <button
          className="px-6 py-3 text-lg rounded-xl shadow-md bg-[#008369] hover:bg-[#00a57f] text-[#ffffff] transition"
          onClick={() => router.push("./Signup")}
        >
          Get Started 🚀
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-12 max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Expense Tracking"
            desc="Easily log your daily expenses and categorize them for better understanding."
            emoji="🧾"
          />
          <FeatureCard
            title="Budget Planning"
            desc="Set monthly budgets and keep your finances in control effortlessly."
            emoji="📊"
          />
          <FeatureCard
            title="Visual Reports"
            desc="Gain insights into your financial habits with beautiful graphs and charts."
            emoji="📈"
          />
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  emoji,
}: {
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <div className="bg-[#2d3748] p-6 rounded-2xl shadow-md border border-[#1a202c] hover:shadow-lg transition duration-300 text-[#f0f0f0]">
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="text-xl font-semibold mb-1 text-[#ffffff]">{title}</h3>
      <p className="text-sm text-[#a0aec0]">{desc}</p>
    </div>
  );
}

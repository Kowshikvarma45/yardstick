"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { useSession } from "next-auth/react";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Other",
];

export default function AddTransactionPage() {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [type, setType] = useState<"income" | "expense">("expense");
  const session = useSession()

  const router = useRouter();
  if(!session.data?.user) {
    router.push("../Account")
  }
  //@ts-ignore
  console.log("userid is : " + session.data?.user.userid)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/Addtransactions", {
        //@ts-ignore
        userId:session.data?.user.userid,
        amount,
        description,
        category,
        type,
        createdAt: new Date().toISOString(),
      });

      if (res.status === 200) {
        alert("Transaction added successfully!");
        router.push("../")
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a202c] rounded-xl shadow-xl w-full max-w-lg p-8"
      >
        <h1 className="text-3xl font-bold text-[#00ffc8] mb-6 text-center">
          Add a Transaction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#cbd5e0] mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="₹0.00"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#cbd5e0] mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g. Uber ride, groceries..."
              required
              className="w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#cbd5e0] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2d3748] border border-[#008369] text-white focus:outline-none focus:ring-2 focus:ring-[#008369]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#cbd5e0]">Type</span>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-semibold ${
                  type === "income"
                    ? "bg-[#00a57f] text-white"
                    : "bg-[#2d3748] text-[#a0aec0]"
                }`}
                onClick={() => setType("income")}
              >
                Income
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-semibold ${
                  type === "expense"
                    ? "bg-[#ff6584] text-white"
                    : "bg-[#2d3748] text-[#a0aec0]"
                }`}
                onClick={() => setType("expense")}
              >
                Expense
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#008369] hover:bg-[#00a57f] text-white py-2 px-4 rounded-md font-semibold transition duration-200"
          >
            Add Transaction
          </button>
        </form>
      </motion.div>
    </div>
  );
}

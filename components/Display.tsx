"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { format } from "date-fns";

const COLORS = ["#00ffa2", "#ff6384", "#36a2eb", "#ffce56", "#9b59b6", "#e74c3c"];

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  createdAt: string;
};

const getDateString = (mode: string, selected: string): string => {
  const today = new Date();
  if (mode === "today") return format(today, "yyyy-MM-dd");
  if (mode === "yesterday") return format(new Date(today.setDate(today.getDate() - 1)), "yyyy-MM-dd");
  if (mode === "date") return selected;
  return format(today, "yyyy-MM-dd");
};

export default function Display() {
  const { data: session } = useSession();
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [category, setCategory] = useState("all");
  const [time, setTime] = useState("today");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const fetchFiltered = async () => {
    //@ts-ignore
    if (!session?.user?.userid) return;
    const date = getDateString(time, selectedDate);
    
    const payload = {
      date,
      //@ts-ignore
      userid: session.user.userid,
      category,
    };

    try {
      const res = await axios.post("/api/getitem", payload);
      setFiltered(res.data.response || []);
    } catch (err) {
      console.error("Error fetching filtered transactions:", err);
    }
  };

  useEffect(() => {
    fetchFiltered();
  }, [session, category, time, selectedDate]);

  const categoryData = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ].map(cat => {
    const transactions = filtered.filter(tx => tx.category === cat);
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return {
      name: cat,
      value: totalAmount,
      count: transactions.length,
    };
  });

  const pieData = categoryData.filter(item => item.value > 0);

  return (
    <div className="w-full p-4 flex flex-col md:flex-row gap-6 bg-gray-900">
      {/* Left Side - Charts (Full width on mobile, half on desktop) */}
      <div className="w-full xl:w-1/2 space-y-6">
        {/* Filters Card */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex flex-wrap gap-4">
            <select
              className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                if (e.target.value !== "date") {
                  setSelectedDate(getDateString(e.target.value, ""));
                }
              }}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="date">Pick a Date</option>
            </select>

            {time === "date" && (
              <input
                type="date"
                className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            )}

            <select
              className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-lg h-[350px]">
          <h3 className="text-lg font-semibold mb-4 text-green-400">Spending by Category</h3>
          {categoryData.some(item => item.value > 0) ? (
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={categoryData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#fff" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#fff" 
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2d3748', 
                    borderColor: '#4a5568',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value) => [`₹${value}`, "Total Amount"]}
                />
                <Bar 
                  dataKey="value" 
                  fill="#00ffa2" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No spending data available
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-[500px] flex flex-col">
  <h3 className="text-md font-semibold mb-4 text-green-400">Spending Distribution</h3>
  <div className="flex-1">
    {pieData.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={2}
            label={({ 
              name, 
              percent, 
              x, 
              y, 
              cx, 
              cy 
            }) => {
              const radius = 120;
              const angle = Math.atan2(y - cy, x - cx);
              const xPos = cx + (radius + 20) * Math.cos(angle);
              const yPos = cy + (radius + 20) * Math.sin(angle);
              
              return (
                <text
                  x={xPos}
                  y={yPos}
                  fill="white"
                  textAnchor={xPos >= cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={12}
                >
                  {`${name}: ₹${(percent * pieData.reduce((sum, item) => sum + item.value, 0)).toFixed(0)}`}
                </text>
              );
            }}
            labelLine={false}
          >
            {pieData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend 
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              paddingLeft: '20px'
            }}
            formatter={(value) => (
              <span className="text-white text-sm">
                {value}
              </span>
            )}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2d3748', 
              borderColor: '#4a5568',
              borderRadius: '0.5rem',
              color: 'white'
            }}
            formatter={(value, name) => [
              `₹${value}`,
              <span className="text-green-400">{name}</span>
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>No distribution data available</p>
      </div>
    )}
  </div>
</div>
</div>

      <div className="w-full md:w-1/2 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-green-400">
            Transactions - {time === "date" ? format(new Date(selectedDate), "MMM dd, yyyy") : time}
            {category !== "all" && ` (${category})`}
          </h2>
        </div>
        
        <div className="overflow-y-auto h-[910px]">
          {filtered.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filtered.map((tx) => (
                <li 
                  key={tx._id} 
                  className="p-4 hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{tx.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {tx.category} • {format(new Date(tx.createdAt), "hh:mm a")}
                      </p>
                    </div>
                    <div className={`text-right font-bold ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>
                      ₹{tx.amount.toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 p-4">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-center">No transactions found for selected filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
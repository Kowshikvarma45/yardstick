import { NextRequest, NextResponse } from "next/server";
import { transactionModel } from "@/app/lib/db"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, userid, category } = body;

    const query: any = {
      userId: userid,
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    };

    if (category !== "all") {
      query.category = category;
    }

    const transactions = await transactionModel.find(query);
    return NextResponse.json({ response: transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}
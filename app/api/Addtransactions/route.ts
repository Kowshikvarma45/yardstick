import { NextRequest, NextResponse } from "next/server";
import { transactionModel } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, description, category, type, createdAt, userId } = body;

    if (!amount || !description || !category || !type || !createdAt || !userId) {
      return NextResponse.json(
        { msg: "All fields are required: amount, description, category, type, createdAt, userId" },
        { status: 400 }
      );
    }

    const newTransaction = await transactionModel.create({
      amount,
      description,
      category,
      type,
      createdAt: new Date(createdAt),
      userId,
    });

    return NextResponse.json(
      { msg: "Transaction successfully added", transaction: newTransaction },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction creation failed:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

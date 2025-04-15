import { userModel } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { msg: "Given email already exists. Try to sign in." },
        { status: 209 } 
      );
    }
    const newUser = await userModel.create({ username, email, password });

    return NextResponse.json(
      {
        msg: "User successfully registered, redirecting to login",
        data: newUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { msg: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

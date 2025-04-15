import { transactionModel } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
     try {
        const body = await req.json();
        const { userId } = body;
    
        if (!userId) {
          return NextResponse.json({ msg: "Missing userId" }, { status: 400 });
        }
    
        const transactions = await transactionModel.find({ userId });

        if(!transactions) {
            return NextResponse.json({
                msg:"Sorry no transactions yet made by you"
            },{
                status:202
            })
        }
        else {
            return NextResponse.json({ response:transactions }, { status: 200 });
        }
    
     }catch(err) {
        return NextResponse.json({
            msg:"some error"
        },{
            status:209
        })
     }
    
}
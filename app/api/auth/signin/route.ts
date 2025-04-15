import { userModel } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const response = await userModel.findOne({
            email:body.email,
        })
        if(!response) {
            return NextResponse.json({
                msg:"Sorry no user found with the given credentials try again"
            },{
                status:203
            })
        }else {
            if(!response.password == body.password) {
                return NextResponse.json({
                    msg:"Incorrect password"
                },{
                    status:203
                })
            }
            return NextResponse.json({
                msg:"user Successfully Logged in",
                response:response
            },{
                status:200
            })
        }
    }catch(err) {
        console.log(err)
        return NextResponse.json({
            msg:"check your internet connection"
        },{
            status:404
        })
    }
 
}
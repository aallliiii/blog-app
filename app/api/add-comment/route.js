import { NextResponse } from "next/server";
import commentModel from "@/models/CommentModel";
import dbConnection from "@/lib/dbConnect";
import userModel from "@/models/UserModel";

export async function POST(req) {
  try {
    await dbConnection();
    const { comment, email, id } = await req.json();
    const user = await userModel.findOne({ email });
    const userId = user._id;
    const newComment = new commentModel({
      user: userId,
      text: comment,
      createdAt: Date.now(),
      post: id,
    });
    await newComment.save();
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
    });
  }
}

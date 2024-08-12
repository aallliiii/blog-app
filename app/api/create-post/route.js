import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import postModel from "@/models/postModel";
export async function POST(req) {
  try {
    await dbConnection();
    const { category, content, email, title, nameUser } = await req.json();

    const post = new postModel({ category, content, email, title, nameUser });
    await post.save();
    return NextResponse.json(
      {
        message: "Post created successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error handling request", error);
    return NextResponse.json(
      {
        message: "Error creating post",
      },
      {
        status: 500,
      }
    );
  }
}

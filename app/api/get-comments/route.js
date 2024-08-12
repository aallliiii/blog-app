import dbConnection from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import commentModel from "@/models/CommentModel";

export async function GET(req) {
  try {
    await dbConnection();
    const url = req.nextUrl;
    const id = url.searchParams.get("id");
    const comments = await commentModel
      .find({ post: id })
      .sort({ _id: -1 })
      .populate("user")
      .populate("post");

    return NextResponse.json(comments, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching comments",
      },
      {
        status: 500,
      }
    );
  }
}

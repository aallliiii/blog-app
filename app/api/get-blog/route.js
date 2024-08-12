import dbConnection from "@/lib/dbConnect";
import postModel from "@/models/postModel";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await dbConnection();
    const url = req.nextUrl;
    const id = url.searchParams.get("id");
    const blogPost = await postModel.findById({
      _id: id,
    });

    return NextResponse.json(blogPost, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
    });
  }
}

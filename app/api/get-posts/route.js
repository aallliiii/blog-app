import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import postModel from "@/models/postModel";
export async function GET(req) {
  try {
    await dbConnection();
    const posts = await postModel.find();

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error) {
    console.log("Error fetching posts");
    return NextResponse.json({
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbConnection();
    const { email } = await req.json();

    const userPosts = await postModel.find({
      email: email,
    });
    console.log(userPosts);
    return NextResponse.json(userPosts, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
    });
  }
}

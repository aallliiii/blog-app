import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnect";
import postModel from "@/models/postModel";
export async function DELETE(req) {
  try {
    await dbConnection();
    const url = req.nextUrl;
    const id = url.searchParams.get("id");

    const deleteUser = await postModel.findByIdAndDelete({
      _id: id,
    });
    if (!deleteUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

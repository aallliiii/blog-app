import commentModel from "@/models/CommentModel";
import dbConnection from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await dbConnection();
    const url = req.nextUrl;
    const id = url.searchParams.get("id");

    const deleteComment = await commentModel.deleteOne({ _id: id });

    return NextResponse.json(deleteComment, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error deleting comment",
      },
      {
        status: 500,
      }
    );
  }
}

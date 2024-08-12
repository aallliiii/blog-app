"use client";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
const PostComents = ({ singleComment, email, getComments }) => {
  const [showButton, setShowButton] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const deleteComment = async () => {
    try {
      const response = axios.delete(
        `/api/delete-comment?id=${singleComment._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const showDeleteButton = () => {
    if (email === singleComment.user.email) {
      setShowButton(true);
    }
  };
  useEffect(() => {
    showDeleteButton();
  }, []);
  return (
    <div className="mt-5 ml-5 p-3 min-w-full">
      <div className="flex gap-4 items-center max-w-[220px] justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={singleComment.user.imageUrl}
            width={40}
            height={30}
            className="rounded-full"
          />
          <h2 className=" text-white">{singleComment.user.name}</h2>
        </div>
        {showButton ? (
          <MdDelete
            className="text-red-600 text-2xl cursor-pointer"
            onClick={async () => {
              deleteComment();
              await delay(300);
              await getComments();
            }}
          />
        ) : null}
      </div>
      <div className="mt-2 max-w-[1000px]">
        <p class="mb-3 text-gray-400">{singleComment.text}</p>
      </div>
    </div>
  );
};

export default PostComents;

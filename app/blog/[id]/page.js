"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import PostComents from "@/components/PostComents";
import axios from "axios";
const Page = ({ params }) => {
  const [data, setData] = useState({});
  const { id } = params;
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const email = session?.user.email;
  const [comments, setComments] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [textareaValue, setTextareaValue] = useState("");
  const getAllComments = async () => {
    try {
      const commentResponse = await axios.get(`/api/get-comments?id=${id}`);
      const commentData = commentResponse.data;
      setComments(commentData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/get-blog?id=${id}`);

        const postData = response.data;

        setData(postData);
      } catch {
        console.log("error");
      }
    };
    getPost();
    getAllComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (status === "loading") {
    return <Loader />;
  }

  const handleCommentChange = (value) => {
    setComment(value);
    setTextareaValue(value);
  };
  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post("/api/add-comment", {
        email: email,
        comment: comment,
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mt-[90px] p-5 flex-col gap-5">
      <div className="flex items-baseline gap-1 flex-col">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl md:px-20 max-sm:p-5 lg:text-6xl text-white">
          {data.title}
        </h1>
        <blockquote className="text-lg px-20 italic font-semibold text-white max-sm:px-5">
          <p>Written by {data.nameUser}</p>
        </blockquote>
      </div>
      <p className="mb-3 text-gray-200 px-20 max-sm:px-5 ">{data.content}</p>
      <p className="text-sm px-20 text-white max-sm:px-5">
        Category: {data.category}
      </p>
      {session ? (
        <div>
          <h3 className="text-3xl font-bold text-white mt-4 ml-5">
            Add Comment
          </h3>
          <div className="p-5">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm rounded-lg border  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-200 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(event) => handleCommentChange(event.target.value)}
              value={textareaValue}
            ></textarea>
            <button
              type="button"
              className="focus:outline-none text-white focus:ring-4 mt-3 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800"
              onClick={async () => {
                handleCommentSubmit();
                await delay(300);
                await getAllComments();
                await delay(300);
                setTextareaValue("");
                setComment("");
              }}
            >
              Add Comment
            </button>
          </div>
        </div>
      ) : null}
      <div>
        <h3 className="text-3xl font-bold text-white mt-0 ml-5 max-sm:w-48">
          Comments
        </h3>
        <div className="flex flex-col ">
          {comments.length > 0 ? (
            comments.map((single) => (
              <PostComents
                key={single._id}
                singleComment={single}
                email={email}
                getComments={getAllComments}
              />
            ))
          ) : (
            <h1 className="text-white p-5 ml-auto mr-auto text-3xl">
              This blog has no comments yet
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

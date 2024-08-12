"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import PostComents from "@/components/PostComents";
import axios from "axios";
const page = ({ params }) => {
  const [data, setData] = useState({});
  const { id } = params;
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const email = session?.user.email;
  const [comments, setComments] = useState([]);
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
  }, []);
  if (status === "loading") {
    return <Loader />;
  }

  const handleCommentChange = (value) => {
    setComment(value);
    console.log(comment);
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
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl px-20 lg:text-6xl text-white">
          {data.title}
        </h1>
        <blockquote class="text-lg px-20 italic font-semibold text-white">
          <p>Written by {data.nameUser}</p>
        </blockquote>
      </div>
      <p class="mb-3 text-gray-200 px-20 dark:text-gray-400">{data.content}</p>
      <p class="text-sm px-20 text-white">Category: {data.category}</p>
      <h3 class="text-3xl font-bold text-white mt-4 ml-5">Add Comment</h3>
      <div className="p-5">
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm rounded-lg border  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-200 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          onChange={(event) => handleCommentChange(event.target.value)}
        ></textarea>
        <button
          type="button"
          class="focus:outline-none text-white focus:ring-4 mt-3 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800"
          onClick={() => {
            handleCommentSubmit();
            window.location.reload();
          }}
        >
          Add Comment
        </button>
      </div>
      <div>
        <h3 class="text-3xl font-bold text-white mt-0 ml-5">Comments:</h3>
        <div className="flex flex-wrap">
          {comments.map((single) => (
            <PostComents key={single} singleComment={single} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

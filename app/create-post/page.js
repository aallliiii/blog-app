"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Tech");
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "loading") {
    return <Loader />;
  }
  const email = session?.user.email;
  const nameUser = session?.user.name;
  const handleTextChange = (value) => {
    setText(value);
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const handlePostSubmission = async () => {
    try {
      const response = await axios.post("/api/create-post", {
        content: text,
        category: category,
        email: email,
        title: title,
        nameUser: nameUser,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen flex-col gap-6  w-screen justify-center max-sm:h-fit">
      <div className="mb-6 mt-[50px] px-5 max-sm:pt-20 max max-sm:mb-0 ">
        <label
          for="default-input"
          className="block mb-2 text-sm font-medium text-white"
        >
          Enter Title
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter Title"
          onChange={(event) => handleTitleChange(event.target.value)}
        />
      </div>

      <div className="flex justify-center w-screen">
        <div className="px-5 w-screen">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-white"
          >
            Write your ideas
          </label>
          <textarea
            id="message"
            rows="4"
            className=" w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-[240px] p-3"
            placeholder="Write your thoughts here..."
            onChange={(event) => handleTextChange(event.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="w-full max-w-sm ml-5 max-sm:p-3 max-sm:max-w-80">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-white"
        >
          Select a category
        </label>
        <select
          onChange={(event) => handleCategoryChange(event.target.value)}
          id="countries"
          className="bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Choose Blog Category
          </option>
          <option value="Tech">Technology</option>
          <option value="Life">Lifestyle</option>
          <option value="Finance">Finance</option>
          <option value="Food">Food</option>
        </select>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ml-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-sm:mb-10"
          onClick={() => handlePostSubmission()}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Page;

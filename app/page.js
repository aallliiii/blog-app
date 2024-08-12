"use client";
import Card from "@/components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
export default function Home() {
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState(true);
  const [category, setCategory] = useState("all");
  const { data: session, status } = useSession();
  const email = session?.user.email;
  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axios.get("/api/get-posts");
      let dataFetched = response.data;
      if (category !== "all") {
        const filteredData = dataFetched.filter(
          (post) => post.category === category
        );
        dataFetched = filteredData;
      }
      setData(dataFetched);
    };
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="mt-[100px] max-sm:mt-[130px]">
      <div className="ml-5">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          type="button"
          onClick={() => setDropdown((prevState) => !prevState)}
        >
          Filter Blogs{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className={`z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 ${
            dropdown ? `hidden` : ""
          }`}
        >
          <ul
            className="py-2 text-sm text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setDropdown((prevState) => !prevState);
                setCategory("all");
              }}
            >
              All
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setDropdown((prevState) => !prevState);
                setCategory("Tech");
              }}
            >
              Tech
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setDropdown((prevState) => !prevState);
                setCategory("Finance");
              }}
            >
              Finance
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setDropdown((prevState) => !prevState);
                setCategory("Food");
              }}
            >
              Food
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setDropdown((prevState) => !prevState);
                setCategory("Life");
              }}
            >
              Life
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-[30px] px-7 mb-[50px]">
        {data.map((singlePost) => (
          <Card key={singlePost._id} post={singlePost} email={email} />
        ))}
      </div>
    </div>
  );
}

"use client";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Card from "@/components/Card";
const profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const userEmail = session?.user.email;

  if (status === "unauthenticated") {
    router.push("/");
  }
  const getUserPosts = async () => {
    const userPosts = await axios.post("/api/get-posts", {
      email: userEmail,
    });

    setPosts(userPosts.data);
  };
  useEffect(() => {
    getUserPosts();
    console.log(window.location.href);
  }, [userEmail]);
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div className="mt-[100px] p-5 flex flex-col ">
      <h2 className="text-4xl font-extrabold text-white">My Blogs</h2>
      <div className="flex gap-4 mt-5 flex-wrap">
        {posts.map((post) => (
          <Card key={post._id} post={post} email={userEmail} />
        ))}
      </div>
    </div>
  );
};

export default profile;

"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isUserLoggedIn, setUserLoggedIn] = useState();
  useEffect(() => {
    if (session) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [session]);
  if (status === "loading") {
    return;
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-slate-950 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 max-sm:gap-3">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Blog Application
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse ">
          {!isUserLoggedIn ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                onClick={signOut}
              >
                Sign Out
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
                onClick={() => (window.location.href = "/create-post")}
              >
                Create Post
              </button>
              <Link href={"/profile"}>
                <img
                  src={session.user.image}
                  width={40}
                  height={30}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

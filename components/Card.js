import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
const Card = ({ post, email }) => {
  const router = useRouter();
  let deleteButton = false;
  if (post.email === email || email === "malihumayon@gmail.com") {
    deleteButton = true;
  }

  const handleDelete = (email) => {
    try {
      const response = axios.delete(`/api/delete-post?id=${post._id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[475px] p-6  rounded-lg shadow bg-gray-800 border-gray-700 max-sm:w-[320px]">
        <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
          {post.title}
        </h5>

        <p className="mb-3 font-normal text-gray-400">
          This blog is written by: {post.nameUser} <br />
          Blog Category: {post.category}
        </p>
        <div className="flex justify-between items-center">
          <a
            href={`/blog/${post._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          {deleteButton ? (
            <MdDelete
              onClick={handleDelete}
              className="text-2xl text-gray-400 hover:text-red-700 cursor-pointer"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;

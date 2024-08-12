import axios from "axios";
import { useRouter } from "next/navigation";
const Card = ({ post, email }) => {
  const router = useRouter();
  let deleteButton = false;
  if (post.email === email) {
    deleteButton = true;
  }

  const handleDelete = (email) => {
    try {
      const response = axios.delete(
        `http://localhost:3000/api/delete-post?id=${post._id}`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="w-[475px] p-6  rounded-lg shadow bg-gray-800 border-gray-700">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight  text-white">
            {post.title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-400">
          This blog is written by: {post.nameUser} <br />
          Blog Category: {post.category}
        </p>
        <a
          href={`/blog/${post._id}`}
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        {deleteButton ? (
          <button
            type="button"
            class="text-white focus:outline-none focus:ring-4 ml-[150px] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
            onClick={() => handleDelete(email)}
          >
            Delete Blog
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Card;

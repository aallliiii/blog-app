const PostComents = ({ singleComment }) => {
  console.log(singleComment);
  return (
    <div className="mt-5 ml-5 p-3 min-w-full">
      <div className="flex gap-4 items-center">
        <img
          src={singleComment.user.imageUrl}
          width={40}
          height={30}
          className="rounded-full"
        />
        <h2 className=" text-white">{singleComment.user.name}</h2>
      </div>
      <div className="mt-2 max-w-[1000px]">
        <p class="mb-3 text-gray-400">{singleComment.text}</p>
      </div>
    </div>
  );
};

export default PostComents;

const Loader = () => {
  return (
    <div className="flex flex-row gap-2 h-screen items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loader;

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      <p className="mt-4 text-zinc-400 text-lg">Loading...</p>
    </div>
  );
};

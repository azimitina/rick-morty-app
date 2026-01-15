import { Link } from 'react-router-dom';

export const ErrorDisplay = ({ message = 'Unable to load data' }: { message: string | null }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px]">
    <h2 className="text-xl font-bold text-zinc-300 mb-2">Oops! Something went wrong</h2>
    <p className="text-zinc-400 mb-4">{message || 'Unable to load data'}</p>
    <Link
      to="/"
      className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
    >
      Back to home page
    </Link>
  </div>
);

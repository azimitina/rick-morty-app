import { memo } from 'react';
import type { PaginationProps } from '../types';

export const Pagination = memo(({ currentPage, pageInfo, onPageChange }: PaginationProps) => {
  if (!pageInfo) return null;

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          First
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(5, pageInfo.pages) }, (_, i) => {
            let pageNum: number;
            if (pageInfo.pages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= pageInfo.pages - 2) {
              pageNum = pageInfo.pages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(pageInfo.pages)}
          disabled={currentPage === pageInfo.pages}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          Last
        </button>
      </div>

      <p className="text-center text-zinc-400 mt-4">
        Page {currentPage} of {pageInfo.pages} ({pageInfo.count} total characters)
      </p>
    </>
  );
});

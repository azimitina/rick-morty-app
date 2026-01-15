import { useState, useRef, useEffect } from 'react';
import type { FilterControlsProps } from '../types';

export const FilterControls = ({ searchTerm, onSearchChange }: FilterControlsProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);
  const isUserTypingRef = useRef(false);

  useEffect(() => {
    if (!isUserTypingRef.current) {
      setInputValue(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        onSearchChange(inputValue);
        // Mark that we're done typing after the debounce fires
        isUserTypingRef.current = false;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, searchTerm, onSearchChange]);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search characters..."
            value={inputValue}
            onChange={(e) => {
              isUserTypingRef.current = true;
              setInputValue(e.target.value);
            }}
            onBlur={() => {
              isUserTypingRef.current = false;
            }}
            className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-zinc-400"
          />
        </div>
      </div>
    </div>
  );
};

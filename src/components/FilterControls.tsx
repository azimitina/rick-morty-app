import { useState, useRef, useEffect } from 'react';
import type { FilterControlsProps } from '../types';

import {
  STATUS_OPTIONS,
  STATUS_LABELS,
  SPECIES_OPTIONS,
  SPECIES_LABELS,
} from '../constants/filterOptions';

export const FilterControls = ({
  searchTerm,
  status,
  species,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
  onSortToggle,
  onClearAll,
}: FilterControlsProps) => {
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
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </select>

        <select
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
          className="bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {SPECIES_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {SPECIES_LABELS[option]}
            </option>
          ))}
        </select>

        <button
          onClick={onSortToggle}
          className="flex items-center gap-2 bg-zinc-700 text-white border border-zinc-600 rounded-lg px-4 py-2 hover:bg-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <span>Name</span>
          <span className="text-green-400">{sortDirection === 'asc' ? '↑ A-Z' : '↓ Z-A'}</span>
        </button>

        <button
          onClick={onClearAll}
          className="flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg px-4 py-2 hover:bg-red-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <span>✕</span>
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};

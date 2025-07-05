import { SearchIcon, XIcon, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useDebounce } from "use-debounce";

interface SearchFieldProps {
  value?: string;
  placeholder?: string;
  debounceTime?: number;
  isLoading?: boolean;
  onSearch: (query: string) => void;
  onClear?: () => void;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  showClearButton?: boolean;
}

export const SearchField = ({
  value: initialValue = "",
  placeholder = "Search...",
  debounceTime = 300,
  isLoading = false,
  onSearch,
  onClear,
  className = "",
  inputClassName = "",
  autoFocus = false,
  showClearButton = true,
}: SearchFieldProps) => {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery] = useDebounce(query, debounceTime);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with external value changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== initialValue) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, initialValue]);

  const handleClear = () => {
    setQuery("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    } else if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <SearchIcon className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full pl-10 pr-10 py-1 border border-gray-300 rounded-md focus:outline-none ${inputClassName}`}
      />

      {/* Clear Button */}
      {showClearButton && query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
        </button>
      )}
    </div>
  );
};

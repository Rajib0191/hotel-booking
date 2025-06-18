// contexts/SearchFormContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { addDays } from "date-fns";

type DateRange = { start: Date | null; end: Date | null };
type Option = {
  value: string;
  label: string;
  person: number;
};

interface SearchFormContextType {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
}

const SearchFormContext = createContext<SearchFormContextType | undefined>(
  undefined
);

export const SearchFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(),
    end: addDays(new Date(), 1),
  });

  const [selectedOption, setSelectedOption] = useState<Option>({
    value: "single",
    person: 1,
    label: "SINGLE",
  });

  return (
    <SearchFormContext.Provider
      value={{
        selectedRange,
        setSelectedRange,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
};

export const useSearchForm = () => {
  const context = useContext(SearchFormContext);
  if (context === undefined) {
    throw new Error("useSearchForm must be used within a SearchFormProvider");
  }
  return context;
};

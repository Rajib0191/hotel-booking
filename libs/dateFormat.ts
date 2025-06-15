
export const formatWithDateFns = (dateInput: string | Date | null | undefined): { formatted: string; day: string } => {
  // Default fallback values
  const fallback = {
    formatted: '-- --- --',
    day: '---'
  };

  // Handle null/undefined cases first
  if (dateInput === null || dateInput === undefined) {
    return fallback;
  }

  let date: Date;
  
  // Handle string or Date inputs
  if (typeof dateInput === 'string') {
    // Try ISO format first
    date = new Date(dateInput);
    
    // If invalid, try parsing as timestamp
    if (isNaN(date.getTime())) {
      const timestamp = Date.parse(dateInput);
      date = isNaN(timestamp) ? new Date(NaN) : new Date(timestamp);
    }
  } else {
    // It's already a Date object
    date = dateInput;
  }

  // Validate the date
  if (isNaN(date.getTime())) {
    return fallback;
  }

  // Formatting with toLocaleString (no date-fns version)
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);          
  const weekday = date.toLocaleString("en-US", { weekday: "long" }); 

  return {
    formatted: `${day} ${month} ${year}`,
    day: weekday,
  };
};
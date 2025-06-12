
export const formatWithDateFns = (dateInput: string | Date): { formatted: string; day: string } => {
    const date = new Date(dateInput);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jun"
    const year = date.getFullYear().toString().slice(-2);           // "25"
    const weekday = date.toLocaleString("en-US", { weekday: "long" }); // "Sunday"
  
    return {
      formatted: `${day} ${month} ${year}`,
      day: weekday,
    };
};

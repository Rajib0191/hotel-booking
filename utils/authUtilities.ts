"use client";

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    return token;
  } else {
    return null;
  }
};

"use client";

import { useUser } from "@/context/UserContext";
import { getUserDetails } from "@/services/userService";
import { User, UserResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useUserDetails = () => {
  const { setUser, isLogin } = useUser();

  const queryResult = useQuery<UserResponse, AxiosError, User>({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
    select: (data) => data.user,
    enabled: isLogin,
  });

  useEffect(() => {
    if (queryResult.data && isLogin) {
      setUser(queryResult.data);
    }
    if (queryResult.error) {
      setUser(null);
    }
  }, [queryResult.data, queryResult.error, setUser, isLogin]);

  return queryResult;
};

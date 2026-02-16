import { useQuery } from "@tanstack/react-query";
import { fetchUserAccount } from "./user-api";

export const useUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: fetchUserAccount,
    retry: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};

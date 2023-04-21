import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useSpecificUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useSpecificUser;

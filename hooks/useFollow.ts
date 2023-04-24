import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useSpecificUser from "./useSpecificUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useSpecificUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.currentUser.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success followed the user!");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return { isFollowing, toggleFollow };
};

export default useFollow;

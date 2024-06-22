import { useDynamicContext } from "@/lib/dynamic";

// TODO: Replace with snapser impl
const useUser = () => {
  const { user, isAuthenticated } = useDynamicContext();
  return {
    user,
    isAuthenticated,
  };
};

export default useUser;

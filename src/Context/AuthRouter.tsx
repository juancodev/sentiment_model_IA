import { Navigate } from "react-router-dom";
import { useAuth } from "@/Hooks/useAuth";
import { childrenProps } from "@/Types";

export const AuthRouter = ({ children }: childrenProps) => {
  const { userSession } = useAuth();

  if (!userSession) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <>{children}</>;
};

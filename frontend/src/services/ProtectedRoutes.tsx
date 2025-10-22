import { Navigate,Outlet } from "react-router";
import { useAuth } from "./useAuth";


type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectPath?: string;
};

export const ProtectedRoute = ({ children, redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
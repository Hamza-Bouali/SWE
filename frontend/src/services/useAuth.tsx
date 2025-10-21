import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, login, logout } = context;

  const isAuthorized = (requiredRole: string) => {
    return user && user.role === requiredRole;
  };

  return { user, login, logout, isAuthorized };
};
// src/routes/RoleBasedRoute.tsx

import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  allowedRoles: string[]; // e.g., ["admin"]
}

const RoleBasedRoute = ({ children, allowedRoles }: Props) => {
  const { user, loading } = useUser();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute; // ✅ Fix: Default export

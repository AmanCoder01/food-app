import React from "react"
import { useUserStore } from "../store/useUserStore"
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, user } = useUserStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />
    }

    if (!user?.isVerified) {
        return <Navigate to="/verify-email" replace={true} />
    }

    return children;
}

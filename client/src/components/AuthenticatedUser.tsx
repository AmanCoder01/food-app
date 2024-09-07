import React from "react"
import { useUserStore } from "../store/useUserStore"
import { Navigate } from "react-router-dom";

export const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, user } = useUserStore();

    if (isAuthenticated && user?.isVerified) {
        return <Navigate to="/" replace={true} />
    }

    return children;
}

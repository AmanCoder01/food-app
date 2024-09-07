import React from "react"
import { useUserStore } from "../store/useUserStore"
import { Navigate } from "react-router-dom";

export const AdminRoutes = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, user } = useUserStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />
    }

    if (!(user?.role === "admin")) {
        return <Navigate to="/" replace={true} />
    }


    return children;
}

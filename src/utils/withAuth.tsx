import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import type { TRole } from "@/types";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(null);

        console.log("Inside Auth", data);
        console.log("User role:", data?.data?.role, "Required:", requiredRole);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to="/unauthorized" />
        }

        return <Component />
    }
}
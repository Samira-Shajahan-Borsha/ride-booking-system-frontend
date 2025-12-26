import Loading from "@/components/modules/common/Loading";
import { accountStatus } from "@/constants/accountStatus";
import { role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import { useGetMyDriverProfileQuery } from "@/redux/features/driver/driver.api";
import type { TRole } from "@/types";
import { type ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {

    return function AuthWrapper() {
        const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(null);

        // console.log(userData, "userData from auth")

        const shouldSkipDriverProfile = !userData?.data || userData.data.role !== role.driver;

        const { data: myDriverProfile, isLoading: isDriverProfileLoading } =
            useGetMyDriverProfileQuery(null, { skip: shouldSkipDriverProfile });

        if (isUserLoading || (!shouldSkipDriverProfile && isDriverProfileLoading)) return <Loading />;

        if (!userData?.data?.email) return <Navigate to="/login" replace />;

        if (userData.data.isActive === accountStatus.BLOCKED) return <Navigate to="/account-status" replace />;

        if (
            userData.data.role === role.driver &&
            (myDriverProfile?.data?.approvalStatus === "PENDING" ||
                myDriverProfile?.data?.approvalStatus === "SUSPEND")
        ) return <Navigate to="/account-status" replace />;

        if (requiredRole && requiredRole !== userData.data.role) return <Navigate to="/unauthorized" replace />;

        return <Component />;
    };
};
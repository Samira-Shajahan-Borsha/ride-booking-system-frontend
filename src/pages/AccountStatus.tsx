import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ShieldAlert, Clock, Ban } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";

import { accountStatus } from "@/constants/accountStatus";
import { role } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.Api";
import { useGetMyDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { useAppDispatch } from "@/redux/hooks";

type AccountStatusType = "BLOCKED" | "PENDING" | "SUSPENDED";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statusConfig: Record<AccountStatusType, any> = {
  BLOCKED: {
    title: "Account Blocked",
    description:
      "Your account has been blocked due to policy violations or security concerns.",
    icon: Ban,
    color: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  PENDING: {
    title: "Driver Approval Pending",
    description:
      "Your driver application is under review. Our admin team will review your information and update your approval status shortly.",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    badge:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  SUSPENDED: {
    title: "Driver Account Suspended",
    description:
      "Your driver account has been suspended. Please contact support for further details.",
    icon: ShieldAlert,
    color: "text-orange-600 dark:text-orange-400",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
};

const AccountStatus = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(null);

  const shouldSkipDriver =
    !userData?.data || userData.data.role !== role.driver;

  const {
    data: driverProfile,
    isLoading: isDriverLoading,
  } = useGetMyDriverProfileQuery(null, {
    skip: shouldSkipDriver,
  });

  const handleLogout = async () => {
    try {
      await logout(null).unwrap();

      dispatch(authApi.util.resetApiState());

      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (isUserLoading || isDriverLoading) return null;

  let status: AccountStatusType | null = null;

  if (userData?.data?.isActive === accountStatus.BLOCKED) {
    status = "BLOCKED";
  }

  else if (
    userData?.data?.role === role.driver &&
    driverProfile?.data?.approvalStatus === "SUSPEND"
  ) {
    status = "SUSPENDED";
  }

  else if (
    userData?.data?.role === role.driver &&
    driverProfile?.data?.approvalStatus === "PENDING"
  ) {
    status = "PENDING";
  }

  if (!status) {
    navigate("/", { replace: true });
    return null;
  }

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="max-w-lg w-full shadow-xl border">
        <CardHeader className="text-center space-y-4">
          <div className={cn("flex justify-center", config.color)}>
            <Icon className="h-10 w-10" />
          </div>

          <div className="flex justify-center">
            <span
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                config.badge
              )}
            >
              {config.title}
            </span>
          </div>

          <CardTitle className="text-xl">{config.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {config.description}
          </p>

          <div className="rounded-lg border bg-background px-4 py-3 text-sm text-left space-y-2">
            <p className="font-medium">Need help?</p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>support@ridebookingapp.com</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>6271</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountStatus;

import {
  BoltIcon,
  BookOpenIcon,
  KeyRoundIcon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMyDriverProfileQuery, useUpdateAvailableStatusMutation } from "@/redux/features/driver/driver.api";
import { role } from "@/constants/role";
import { driverAvailabilityStatus } from "@/constants/driverAvailabilityStatus";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function UserMenu() {
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();
  const { data: userData } = useUserInfoQuery(null);

  const { data: driverProfile } = useGetMyDriverProfileQuery(null, {
    skip: userData?.data?.role !== role.driver,
  });

  const [updateAvailability, { isLoading: isUpdating }] = useUpdateAvailableStatusMutation();

  const [isOnlineLocal, setIsOnlineLocal] = useState(false);

  useEffect(() => {
    if (driverProfile?.data?.isAvailable) {
      setIsOnlineLocal(driverProfile.data.isAvailable === driverAvailabilityStatus.ONLINE);
    }
  }, [driverProfile?.data?.isAvailable]);

  const handleLogout = async () => {
    await logout(null);
    dispatch(authApi.util.resetApiState());
  };

  const isDriver = userData?.data?.role === role.driver;

  const handleToggleAvailability = async () => {
    if (!driverProfile?.data?._id) return;

    setIsOnlineLocal(isOnlineLocal => !isOnlineLocal);

    const status = {
      isAvailable: isOnlineLocal
        ? driverAvailabilityStatus.OFFLINE
        : driverAvailabilityStatus.ONLINE,
    };

    try {
      await updateAvailability({ driverId: driverProfile.data._id, status });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setIsOnlineLocal(isOnlineLocal => !isOnlineLocal);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="font-semibold">
                {userData?.data?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {isDriver && (
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background
                  ${isOnlineLocal ? "bg-green-500" : "bg-gray-400"}`}
              />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <p className="text-foreground truncate text-sm font-medium">{userData?.data?.name}</p>
          <p className="text-xs text-muted-foreground">{userData?.data?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isDriver && (
          <>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full
                    ${isOnlineLocal ? "bg-green-500" : "bg-gray-400"}`}
                />
                <span className="text-sm font-medium">{isOnlineLocal ? "Online" : "Offline"}</span>
              </div>

              <Switch
                checked={isOnlineLocal}
                onCheckedChange={handleToggleAvailability}
                disabled={isUpdating}
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <Link to='/change-password'>
            <DropdownMenuItem
            >
              <KeyRoundIcon size={16} className="opacity-60" />
              <span>Change Password</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >

  );
}

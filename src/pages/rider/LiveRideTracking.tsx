import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useCancelRideMutation, useGetCurrentRideQuery } from "@/redux/features/ride/ride.api";
import { Link } from "react-router";
import { format } from "date-fns";
import Badge from "@/components/ui/badge";
import { rideStatus } from "@/constants/rideStatus";
import Loading from "@/components/modules/common/Loading";
import { capitalize } from "@/utils/capitalize";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { getStatusColor } from "@/utils/getRideStatusColor";
import TimelineItem from "@/components/modules/common/TimelineItem";

const getRideStatusMessage = (status: string) => {
  switch (status) {
    case rideStatus.REQUESTED: return "🕒 Waiting for a driver to accept your ride...";
    case rideStatus.ACCEPTED: return "🤵 Driver is on the way to pick you up!";
    case rideStatus.PICKED_UP: return "🚗 Ride in progress – enjoy your trip!";
    case rideStatus.IN_TRANSIT: return "🚗 Ride in progress – enjoy your trip!";
    case rideStatus.COMPLETED: return "✅ Ride completed. Thank you for riding with us!";
    case rideStatus.CANCELED: return "❌ Ride was canceled.";
    default: return "";
  }
};

const LiveRideTracking = () => {
  const { data: currentRide, isLoading } = useGetCurrentRideQuery(null, {
    pollingInterval: 5000
  });

  const [cancelRide] = useCancelRideMutation();

  const formatTime = (date: string | number | Date | null) => {
    return date ? format(new Date(date), "PPpp") : "Pending";
  };

  const handleCancelRequest = async () => {
    const toastId = toast.loading("Cancelling ride request...");

    try {
      await cancelRide(currentRide?.data?._id as string).unwrap();

      toast.success("Ride canceled successfully", { id: toastId });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel ride", { id: toastId });
    }
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const ride = currentRide?.data;

  // === CASE 1: No current ride
  if (!ride) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="max-w-md w-full shadow-lg border border-border p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">No Active Ride</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm space-y-2">
            <p>You don’t have any ongoing rides at the moment.</p>
            <p>Start your next journey by requesting a ride.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/rider/request-ride">
              <Button className="w-full sm:w-auto">Request a Ride</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // === CASE 1: Current ride
  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            Your Ride Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Pickup:</strong> {ride.pickUp.address}
          </p>
          <p>
            <strong>Destination:</strong> {ride.destination.address}
          </p>
          <p>
            <strong>Distance:</strong> {ride.distance} km
          </p>
          <p>
            <strong>Fare:</strong> {ride.fare} Tk
          </p>
          <p>
            <strong>Payment:</strong>{" "}
            {capitalize(ride?.paymentMethod)}
          </p>
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <Badge
              variant="outline"
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                ride.status
              )}`}
            >
              {capitalize(ride.status)}
            </Badge>
          </p>

          {ride.driver && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <h3 className="font-medium mb-2 text-foreground">Driver Info</h3>
              <p className="text-sm">
                <strong>Driver:</strong> {ride?.driver?.user?.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {ride?.driver?.user?.email}
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="font-medium mb-3 text-foreground">Ride Timeline</h3>
            <div className="space-y-4">
              {/* Requested */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-3 w-3 rounded-full mt-1 ${ride.requestedAt ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></div>
                <div>
                  <p className="text-sm font-medium">Requested</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(ride.requestedAt)}
                  </p>
                </div>
              </div>

              <TimelineItem
                label="Accepted"
                date={ride.acceptedAt}
                active
              />
              <TimelineItem
                label="Picked Up"
                date={ride.pickedUpAt}
                active={!!ride.pickedUpAt}
              />
              <TimelineItem
                label="Completed"
                date={ride.completedAt}
                active={!!ride.completedAt}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {
            ride?.status === rideStatus.REQUESTED ? (<AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Cancel Request
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to cancel this ride?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Canceling will remove your ride request. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Ride</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelRequest}>
                    Confirm Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>)
              : <p>{getRideStatusMessage(ride.status)}</p>
          }
        </CardFooter>
      </Card>
    </div>
  );

}

export default LiveRideTracking



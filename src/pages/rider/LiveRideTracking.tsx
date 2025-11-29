import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useGetCurrentRideQuery } from "@/redux/features/ride/ride.api";
import { Link } from "react-router";
import { format } from "date-fns";
import Badge from "@/components/ui/badge";
import { rideStatus } from "@/constants/rideStatus";
import type { RideStatus } from "@/types/ride.type";

const getStatusColor = (status: RideStatus) => {
  switch (status) {
    case rideStatus.REQUESTED:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case rideStatus.ACCEPTED:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case rideStatus.PICKED_UP:
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case rideStatus.IN_TRANSIT:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case rideStatus.COMPLETED:
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const LiveRideTracking = () => {
  const { data: currentRide, isLoading } = useGetCurrentRideQuery(null);

  const formatTime = (date: string | number | Date | null) => {
    return date ? format(new Date(date), "PPpp") : "Pending";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  const ride = currentRide?.data;
  console.log(ride);

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
            {ride.paymentMethod.charAt(0).toUpperCase() +
              ride.paymentMethod.slice(1).toLowerCase()}
          </p>
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <Badge
              variant="outline"
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                ride.status
              )}`}
            >
              {ride.status}
            </Badge>
          </p>

          {ride.driver && (
            <div className="mt-4 pt-4 border-t border-border">
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

              {/* Accepted */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-3 w-3 rounded-full mt-1 ${ride.acceptedAt ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></div>
                <div>
                  <p className="text-sm font-medium">Accepted</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(ride.acceptedAt)}
                  </p>
                </div>
              </div>

              {/* Picked Up */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-3 w-3 rounded-full mt-1 ${ride.pickedUpAt ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></div>
                <div>
                  <p className="text-sm font-medium">Picked Up</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(ride.pickedUpAt)}
                  </p>
                </div>
              </div>

              {/* Completed */}
              <div className="flex items-start gap-3">
                <div
                  className={`h-3 w-3 rounded-full mt-1 ${ride.completedAt ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></div>
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(ride.completedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {
            ride?.status === rideStatus.REQUESTED ? <Button
              variant="destructive"
              className="w-full"
            >
              Cancel Ride
            </Button>
              : <p>🚗 Ride is {ride.status === "ACCEPTED" ? "on the way!" : "in progress..."}</p>
          }
        </CardFooter>
      </Card>
    </div>
  );

}

export default LiveRideTracking



import Loading from "@/components/modules/common/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { toast } from "sonner";

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
} from "@/components/ui/alert-dialog";

import {
  useGetCurrentRideQuery,
  useCancelRideMutation,
  useUpdateRideStatusMutation,
  useCompleteRideMutation,
} from "@/redux/features/ride/ride.api";
import { capitalize } from "@/utils/capitalize";
import { rideStatus } from "@/constants/rideStatus";
import { getStatusColor } from "@/utils/getRideStatusColor";
import type { RideStatus } from "@/types/ride.type";
import TimelineItem from "@/components/modules/common/TimelineItem";
import { Link } from "react-router";

const RideManagement = () => {
  const { data, isLoading } = useGetCurrentRideQuery(null);
  const ride = data?.data;

  const [cancelRide, { isLoading: isCanceling }] = useCancelRideMutation();
  const [completeRide, { isLoading: isCompleting }] = useCompleteRideMutation();
  const [updateRideStatus, { isLoading: isUpdating }] =
    useUpdateRideStatusMutation();

  if (isLoading) return <Loading />;

  if (!ride) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-md w-full shadow-lg border border-border p-6">
          <CardTitle>No Active Ride</CardTitle>
          <p className="text-muted-foreground mt-2">
            You don’t have any active ride right now.
          </p>

          <CardFooter className="flex justify-center">
            <Link to="/driver/incoming-requests">
              <Button className="w-full sm:w-auto">View Incoming Requests</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleCancel = async () => {
    const toastId = toast.loading("Canceling ride...");
    try {
      await cancelRide(ride._id).unwrap();
      toast.success("Ride canceled successfully", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel ride", {
        id: toastId,
      });
    }
  };

  const handleCompleteRide = async () => {
    const toastId = toast.loading("Completing ride...");
    try {
      await completeRide(ride._id).unwrap();
      toast.success("Ride completed successfully", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to complete ride", {
        id: toastId,
      });
    }
  };

  const handleStatusUpdate = async (status: RideStatus) => {
    const toastId = toast.loading("Updating ride status...");
    try {
      await updateRideStatus({ rideId: ride._id, status: { status } }).unwrap();
      toast.success("Ride status updated", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 px-4">
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Active Ride
            <Badge
              variant="outline"
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                ride.status
              )}`}
            >
              {capitalize(ride.status)}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 text-sm text-muted-foreground">
          {/* LOCATIONS */}
          <div className="space-y-4">
            <p>
              <strong>Pickup:</strong> {ride.pickUp.address}
            </p>
            <p>
              <strong>Destination:</strong> {ride.destination.address}
            </p>
          </div>

          {/* RIDE INFO */}
          <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <p>
              <strong className="text-muted-foreground">Fare:</strong> {ride.fare} Tk
            </p>
            <p>
              <strong className="text-muted-foreground">Distance:</strong>{" "}
              {ride.distance} km
            </p>
            <p>
              <strong className="text-muted-foreground">Payment:</strong>{" "}
              {capitalize(ride.paymentMethod)}
            </p>
          </div>

          {/* TIMELINE */}
          <div className="border-t pt-6 space-y-4">
            <p className="text-sm font-medium text-foreground">Ride Timeline</p>

            <div className="space-y-3">
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

        {/* ACTIONS */}
        <CardFooter className="flex flex-wrap gap-3 justify-end">
          {ride.status === rideStatus.ACCEPTED && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isCanceling}>
                  Cancel Ride
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this ride?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can only cancel before picking up the rider.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Ride</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {ride.status === rideStatus.ACCEPTED && (
            <Button
              onClick={() => handleStatusUpdate(rideStatus.PICKED_UP as RideStatus)}
              disabled={isUpdating}
            >
              Mark as Picked Up
            </Button>
          )}

          {ride.status === rideStatus.PICKED_UP && (
            <Button
              onClick={() => handleStatusUpdate(rideStatus.IN_TRANSIT as RideStatus)}
              disabled={isUpdating}
            >
              Start Trip
            </Button>
          )}

          {ride.status === rideStatus.IN_TRANSIT && (
            <Button
              onClick={handleCompleteRide}
              disabled={isCompleting}
            >
              Complete Ride
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RideManagement;
import Loading from "@/components/modules/common/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useAcceptRideMutation,
  useGetCurrentRideQuery,
  useGetIncomingRideRequestsQuery,
} from "@/redux/features/ride/ride.api";
import { capitalize } from "@/utils/capitalize";
import { format } from "date-fns";
import { useNavigate } from "react-router";

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
import { useGetMyDriverProfileQuery } from "@/redux/features/driver/driver.api";

const IncomingRequests = () => {
  const navigate = useNavigate();

  const { data: currentRide, isLoading: isCurrentRideLoading } = useGetCurrentRideQuery(null);

  const activeRide = currentRide?.data;

  console.log(activeRide, "activeRide");

  const skipIncoming = isCurrentRideLoading || !!currentRide?.data

  const { data: incomingRideRequests, isLoading: isIncomingRequestsLoading } =
    useGetIncomingRideRequestsQuery(null, { pollingInterval: 5000, skip: skipIncoming });

  const { data: driverProfile } = useGetMyDriverProfileQuery(null);

  const [acceptRide] = useAcceptRideMutation();

  const handleAcceptRide = async (rideId: string) => {

    const toastId = toast.loading("Accepting ride...");

    const driverInfo = {
      driver: driverProfile?.data?._id as string
    }

    try {
      await acceptRide({ rideId, driverInfo }).unwrap();

      toast.success("Ride accepted successfully", { id: toastId });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept ride", { id: toastId });
    }
  }

  if (isCurrentRideLoading || isIncomingRequestsLoading) return <Loading />;

  // CASE - 1 If driver already accepted a ride
  if (activeRide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="max-w-md w-full shadow-lg border border-border p-6">
          <CardHeader>
            <CardTitle className="text-lg mb-2">Incoming Ride Requests</CardTitle>
          </CardHeader>

          <CardContent className="text-gray-700 dark:text-gray-300 space-y-2">
            <p>You already have an active ride.</p>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              className="w-full sm:w-auto"
              onClick={() => navigate("/driver/ride-management")}
            >
              Manage Active Ride
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // CASE - 2 If there's no incoming requests
  if (incomingRideRequests?.data?.length === 0) {
    return (<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Card className="max-w-md w-full shadow-lg border border-border p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">No Incoming Ride Requests</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm space-y-2">
          <p>There are currently no ride requests.</p>
          <p>Check back later or stay online to receive new requests.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full sm:w-auto" onClick={() => navigate("/driver/dashboard")}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>)
  }

  // CASE - 3 If driver has no active ride
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Incoming Ride Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {incomingRideRequests?.data?.map((ride) => (
          <Card key={ride._id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {ride.pickUp.address} → {ride.destination.address}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p><strong>Fare:</strong> ৳{ride.fare}</p>
              <p><strong>Distance:</strong> {ride.distance} km</p>
              <p><strong>Payment:</strong> {capitalize(ride.paymentMethod)}</p>
              <p><strong>Requested:</strong> {format(new Date(ride.requestedAt), "PPpp")}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="mt-2 w-full md:w-auto">
                    Accept
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to accept this ride?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Accepting this ride will mark it as active for you. You cannot undo this action.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleAcceptRide(ride?._id)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncomingRequests;

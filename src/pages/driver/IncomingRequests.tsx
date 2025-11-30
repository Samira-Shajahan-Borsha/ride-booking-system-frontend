import Loading from "@/components/modules/common/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
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


const IncomingRequests = () => {
  const navigate = useNavigate();

  const { data: incomingRideRequests, isLoading } =
    useGetIncomingRideRequestsQuery(null);

  const { data: currentRide } = useGetCurrentRideQuery(null);

  const activeRide = currentRide?.data;

  console.log(activeRide, "activeRide");

  if (activeRide) {
    return (
      <Card className="p-6">
        <CardTitle className="text-lg mb-2">Incoming Ride Requests</CardTitle>
        <p className="text-gray-700 dark:text-gray-300">
          You already have an active ride.
        </p>

        <Button className="mt-4" onClick={() => navigate("/driver/ride-management")}>
          Manage Active Ride
        </Button>
      </Card>
    );
  }

  if (isLoading) return <Loading />;

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

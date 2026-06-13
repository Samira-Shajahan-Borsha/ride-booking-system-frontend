import Loading from "@/components/modules/common/Loading";
import Badge from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSingleRideQuery } from "@/redux/features/ride/ride.api";
import { capitalize } from "@/utils/capitalize";
import { getStatusColor } from "@/utils/getRideStatusColor";
import { format } from "date-fns";
import { useParams } from "react-router";

const RideDetails = () => {
  const { rideId } = useParams();

  const { data: rideData, isLoading } = useGetSingleRideQuery(
    rideId,
    { skip: !rideId }
  );

  const ride = rideData?.data ?? {};

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <Card>
        <CardContent className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Ride ID</p>
            <p className="font-medium">{ride?._id}</p>
          </div>

          <Badge
            variant="outline"
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
              ride.status
            )}`}
          >
            {capitalize(ride.status)}
          </Badge>

          <div>
            <p className="text-sm text-muted-foreground">Fare</p>
            <p className="font-semibold">{ride?.fare} Tk</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Payment</p>
            <p className="font-medium">{ride?.paymentMethod}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p><strong>Name:</strong> {ride?.rider?.name}</p>
            <p><strong>Email:</strong> {ride?.rider?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p><strong>Name:</strong> {ride?.driver?.user?.name ? ride?.driver?.user?.name : "N/A"}</p>
            <p><strong>Email:</strong> {ride?.driver?.user?.email ? ride?.driver?.user?.email : "N/A"}</p>
            <p><strong>Vehicle:</strong> {ride?.driver?.vehicle ? ride?.driver?.vehicle : "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p><strong>Pickup:</strong> {ride?.pickUp?.address}</p>
          <p><strong>Destination:</strong> {ride?.destination?.address}</p>
          <p><strong>Distance:</strong> {ride?.distance} km</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ride Timeline</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Requested At:</strong>{" "}
            {ride?.requestedAt
              ? format(new Date(ride.requestedAt), "PPpp")
              : "—"}
          </p>
          {
            !ride.canceledBy && <>
              <p>
                <strong>Accepted At:</strong>{" "}
                {ride?.acceptedAt
                  ? format(new Date(ride.acceptedAt), "PPpp")
                  : "Pending"}
              </p>

              <p>
                <strong>Completed At:</strong>{" "}
                {ride?.completedAt
                  ? format(new Date(ride.completedAt), "PPpp")
                  : "Pending"}
              </p>
            </>
          }
          {ride?.canceledBy && (
            <p>
              <strong>Canceled By:</strong> {capitalize(ride.canceledBy)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
};

export default RideDetails;
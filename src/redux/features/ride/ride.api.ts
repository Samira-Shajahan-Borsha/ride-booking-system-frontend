import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRide, IRideInfo } from "@/types";

export const rideApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        requestRide: build.mutation<IResponse<IRide>, IRideInfo>({
            query: (rideInfo) => ({
                url: "/rides/request",
                method: "POST",
                data: rideInfo,
            }),
            invalidatesTags: ["RIDE"],
        }),
        getCurrentRide: build.query<IResponse<IRide>, null>({
            query: () => ({
                url: "/rides/current-ride",
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        getIncomingRideRequests: build.query<IResponse<IRide[]>, null>({
            query: () => ({
                url: "/rides/incoming-ride-requests",
                method: "GET",
            }),
            providesTags: ["RIDE"],
        }),
        acceptRide: build.mutation<
            IResponse<IRide>,
            { rideId: string; driverInfo: { driver: string } }
        >({
            query: ({ rideId, driverInfo }) => ({
                url: `/rides/accept/${rideId}`,
                method: "PATCH",
                data: driverInfo,
            }),
            invalidatesTags: ["RIDE"],
        }),
        cancelRide: build.mutation<IResponse<IRide>, string>({
            query: (rideId) => ({
                url: `/rides/cancel/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDE"],
        }),
    }),
});

export const {
    useRequestRideMutation,
    useGetCurrentRideQuery,
    useGetIncomingRideRequestsQuery,
    useAcceptRideMutation,
    useCancelRideMutation,
} = rideApi;

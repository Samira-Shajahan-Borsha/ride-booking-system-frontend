import { baseApi } from "@/redux/baseApi";
import type { IDriver, IResponse, IRide } from "@/types";
import type { RideHistoryQuery } from "@/types/ride.type";

export const driverApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyDriverProfile: build.query<IResponse<IDriver>, null>({
            query: () => ({
                url: "/drivers/me",
                method: "GET",
            }),
            providesTags: ["DRIVER"],
        }),
        updateAvailableStatus: build.mutation<
            IResponse<IDriver>,
            { driverId: string; status: { isAvailable: string } }
        >({
            query: ({ driverId, status }) => ({
                url: `/drivers/available-status/${driverId}`,
                method: "POST",
                data: status,
            }),
            invalidatesTags: ["DRIVER"],
        }),
        getAllDrivers: build.query<IResponse<IRide[]>, RideHistoryQuery>({
            query: (params) => ({
                url: "/drivers/all-drivers",
                method: "GET",
                params,
            }),
            providesTags: ["DRIVER"],
        }),
    }),
});

export const {
    useGetMyDriverProfileQuery,
    useUpdateAvailableStatusMutation,
    useGetAllDriversQuery,
} = driverApi;

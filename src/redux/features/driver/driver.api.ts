import { baseApi } from "@/redux/baseApi";
import type { IDriver, IResponse } from "@/types";

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
    }),
});

export const { useGetMyDriverProfileQuery, useUpdateAvailableStatusMutation } = driverApi;

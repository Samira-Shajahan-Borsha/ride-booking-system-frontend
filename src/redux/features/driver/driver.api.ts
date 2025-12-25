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
        getAllDrivers: build.query({
            query: (params) => ({
                url: "/drivers/all-drivers",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map((driver: IDriver) => ({
                              type: "DRIVER" as const,
                              id: driver?._id,
                          })),
                          { type: "DRIVER", id: "DRIVER_LIST" },
                      ]
                    : [{ type: "DRIVER", id: "DRIVER_LIST" }],
        }),
        approveDriver: build.mutation<IResponse<IDriver>, string>({
            query: (driverId) => ({
                url: `/drivers/approve/${driverId}`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "DRIVER", id: "DRIVER_LIST" }],
        }),
        suspendDriver: build.mutation<IResponse<IDriver>, string>({
            query: (driverId) => ({
                url: `/drivers/suspend/${driverId}`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "DRIVER", id: "DRIVER_LIST" }],
        }),
    }),
});

export const {
    useGetMyDriverProfileQuery,
    useUpdateAvailableStatusMutation,
    useGetAllDriversQuery,
    useApproveDriverMutation,
    useSuspendDriverMutation,
} = driverApi;

import { baseApi } from "@/redux/baseApi";
import type { IResponse, User } from "@/types";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllRiders: build.query({
            query: (params) => ({
                url: "/users/all-riders",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map((rider: User) => ({
                              type: "RIDER" as const,
                              id: rider?._id,
                          })),
                          { type: "RIDER", id: "RIDER_LIST" },
                      ]
                    : [{ type: "RIDER", id: "RIDER_LIST" }],
        }),
        blockRider: build.mutation<IResponse<User>, string>({
            query: (riderId) => ({
                url: `/users/block/${riderId}`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "RIDER", id: "RIDER_LIST" }],
        }),
        unblockRider: build.mutation<IResponse<User>, string>({
            query: (riderId) => ({
                url: `/users/unblock/${riderId}`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "RIDER", id: "RIDER_LIST" }],
        }),
        getUserStats: build.query({
            query: () => ({
                url: "/stats/user",
                method: "GET",
            }),
        }),
        getDriverStats: build.query({
            query: () => ({
                url: "/stats/driver",
                method: "GET",
            }),
        }),
        getRideStats: build.query({
            query: () => ({
                url: "/stats/ride",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllRidersQuery,
    useBlockRiderMutation,
    useUnblockRiderMutation,
    useGetUserStatsQuery,
    useGetDriverStatsQuery,
    useGetRideStatsQuery,
} = adminApi;

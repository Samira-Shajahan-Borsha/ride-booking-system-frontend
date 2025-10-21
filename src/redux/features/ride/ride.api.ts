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
        }),
    }),
});

export const { useRequestRideMutation } = rideApi;

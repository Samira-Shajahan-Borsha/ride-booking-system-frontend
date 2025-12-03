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
    }),
});

export const { useGetMyDriverProfileQuery } = driverApi;

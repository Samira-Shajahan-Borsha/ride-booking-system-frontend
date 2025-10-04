import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (userInfo) => ({
                url: "/users/register",
                method: "POST",
                data: userInfo,
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;

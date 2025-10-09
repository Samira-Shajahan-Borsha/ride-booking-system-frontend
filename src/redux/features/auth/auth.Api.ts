import { baseApi } from "@/redux/baseApi";
import type { ILoginInfo, ILoginRes, IRegisterInfo, IResponse, User } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<IResponse<User>, IRegisterInfo>({
            query: (userInfo) => ({
                url: "/users/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        login: build.mutation<IResponse<ILoginRes>, ILoginInfo>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],
        }),
        logout: build.mutation<IResponse<null>, null>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"],
        }),
        userInfo: build.query<IResponse<User>, null>({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery, useLogoutMutation } =
    authApi;

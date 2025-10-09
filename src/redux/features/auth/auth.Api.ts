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
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

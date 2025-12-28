import { baseApi } from "@/redux/baseApi";
import type {
    IChangePasswordInfo,
    ILoginInfo,
    ILoginRes,
    IRegisterInfo,
    IResponse,
    User,
} from "@/types";

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
        changePassword: build.mutation<IResponse<null>, IChangePasswordInfo>({
            query: (passwords) => ({
                url: "/auth/change-password",
                method: "POST",
                data: passwords,
            }),
            invalidatesTags: ["USER"],
        }),
        updateProfile: build.mutation({
            query: ({ userId, data }) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: ["USER"],
        }),
        submitMessage: build.mutation({
            query: (data) => ({
                url: "/contacts/message",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["USER"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogoutMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useSubmitMessageMutation,
} = authApi;

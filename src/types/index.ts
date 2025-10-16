import type { ComponentType } from "react";

export type { IRegisterInfo, User, ILoginRes, ILoginInfo } from "@/types/auth.type";

export interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER";

export interface ISidebarItems {
    title: string;
    url: string;
    Component: ComponentType;
}

import type { ComponentType } from "react";

export type {
    IRegisterInfo,
    User,
    ILoginRes,
    ILoginInfo,
    IChangePasswordInfo,
} from "@/types/auth.type";

export type { IRideInfo, IRide } from "@/types/ride.type";

export type { IDriver } from "@/types/driver.type";

interface IMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: IMeta;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER";

export interface ISidebarItems {
    title: string;
    url: string;
    Component: ComponentType;
}

export type { IRegisterInfo, User, ILoginRes, ILoginInfo } from "@/types/auth.type";

export interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

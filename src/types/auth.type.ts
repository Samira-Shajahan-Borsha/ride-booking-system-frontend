export interface IRegisterInfo {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export interface IChangePasswordInfo {
    oldPassword: string;
    newPassword: string;
}

export interface Auth {
    provider: string;
    providerId: string;
}

export interface ILoginRes {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    isActive: string;
    isDeleted: boolean;
    auths: Auth[];
    createdAt: string;
    updatedAt: string;
}

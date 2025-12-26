import type { User } from "./auth.type";

export type TApprovalStatus = "PENDING" | "SUSPEND" | "APPROVED";

export interface IDriver {
    _id: string;
    user: User;
    totalEarnings: number;
    isAvailable: string;
    approvalStatus: TApprovalStatus;
    currentRide: string | null;
    vehicle: null;
    rating: null;
    createdAt: string;
    updatedAt: string;
}

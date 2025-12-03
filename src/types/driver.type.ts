import type { User } from "./auth.type";

export interface IDriver {
    _id: string;
    user: User;
    totalEarnings: number;
    isAvailable: string;
    approvalStatus: string;
    currentRide: string | null;
    vehicle: null;
    rating: null;
    createdAt: string;
    updatedAt: string;
}

import type { rideStatus } from "@/constants/rideStatus";

export interface IRideInfo {
    rider: string;
    pickUp: PickUp;
    destination: Destination;
    distance: number;
    paymentMethod: string;
}

interface PickUp {
    address: string;
}

interface Destination {
    address: string;
}

interface Driver {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role?: string;
    };
}

export type RideStatus = keyof typeof rideStatus;

export interface IRide {
    _id: string;
    rider: string;
    driver: null | Driver;
    vehicle: null | string;
    currentRiderId: string;
    status: RideStatus;
    pickUp: PickUp;
    destination: Destination;
    fare: number;
    distance: number;
    paymentMethod: string;
    requestedAt: string;
    acceptedAt: null | string;
    pickedUpAt: null | string;
    completedAt: null | string;
    canceledBy: null | string;
    rating: null | string;
    createdAt: string;
    updatedAt: string;
}

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

export interface IRide {
    rider: string;
    driver: null | string;
    vehicle: null | string;
    currentRiderId: string;
    status: string;
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
    _id: string;
    createdAt: string;
    updatedAt: string;
}

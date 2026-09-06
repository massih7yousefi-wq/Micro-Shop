export interface AddressResponse {
    id: number;
    recipientName: string;
    recipientPhone: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
}

export interface CreateAddressRequest {
    recipientName: string;
    recipientPhone: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
}

export interface UpdateAddressRequest {
    recipientName: string;
    recipientPhone: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
}

export interface AddressMessageResponse {
    message: string;
}


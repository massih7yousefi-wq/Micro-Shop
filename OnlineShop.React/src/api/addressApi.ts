import { api } from "./client";

import type {
    AddressMessageResponse,
    AddressResponse,
    CreateAddressRequest,
    UpdateAddressRequest,
} from "../types/address";


export const addressApi = {

    // Get All Addresses
    // GET /api/addresses---------------------------------------

    getAll: async (): Promise<AddressResponse[]> => {

        const response =
            await api.get<AddressResponse[]>(
                "/addresses"
            );

        return response.data;
    },


    // Get Address
    // GET /api/addresses/{id}---------------------------------

    getById: async (
        id: number
    ): Promise<AddressResponse> => {

        const response =
            await api.get<AddressResponse>(
                `/addresses/${id}`
            );

        return response.data;
    },


    // Create Address
    // POST /api/addresses-------------------------------------

    create: async (
        data: CreateAddressRequest
    ): Promise<AddressResponse> => {

        const response =
            await api.post<AddressResponse>(
                "/addresses",
                data
            );

        return response.data;
    },


    // Update Address
    // PUT /api/addresses/{id}---------------------------------

    update: async (
        id: number,
        data: UpdateAddressRequest
    ): Promise<AddressResponse> => {

        const response =
            await api.put<AddressResponse>(
                `/addresses/${id}`,
                data
            );

        return response.data;
    },


    // Delete Address
    // DELETE /api/addresses/{id}------------------------------

    delete: async (
        id: number
    ): Promise<void> => {

        await api.delete(
            `/addresses/${id}`
        );
    },


    // Set Default Address
    // PATCH /api/addresses/{id}/default----------------------

    setDefault: async (
        id: number
    ): Promise<AddressMessageResponse> => {

        const response =
            await api.patch<AddressMessageResponse>(
                `/addresses/${id}/default`
);

return response.data;
   },
};


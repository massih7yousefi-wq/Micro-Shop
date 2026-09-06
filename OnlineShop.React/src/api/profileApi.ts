import { api } from "./client";

import type {
    UpdateProfileRequest,
    UserProfile,
} from "../types/profile";


export const profileApi = {

    // Get Profile
    // GET /api/profile-----------------------------------------

    getProfile: async (): Promise<UserProfile> => {

        const response =
            await api.get<UserProfile>(
                "/profile"
            );

        return response.data;
    },


    // Update Profile
    // PUT /api/profile-----------------------------------------

    updateProfile: async (
        data: UpdateProfileRequest
    ): Promise<UserProfile> => {

        const response =
            await api.put<UserProfile>(
                "/profile",
                data
            );

        return response.data;
    },
};


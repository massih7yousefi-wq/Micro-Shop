export interface UserProfile {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
}

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
}



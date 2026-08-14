import axios from "axios";

export const API_BASE =
    import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
});
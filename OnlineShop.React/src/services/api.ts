import axios from "axios";

export const API_BASE = "https://localhost:44341";

export const api = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 10000,
    headers: {
        Accept: "application/json",
    },
});
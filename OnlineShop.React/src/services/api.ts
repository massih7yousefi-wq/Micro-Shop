import axios from "axios";

export const API_BASE = "https://micro-shop-api.onrender.com";

export const api = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
});
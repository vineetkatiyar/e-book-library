import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true
});

axiosApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token; // synchronous read outside React
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosApi;
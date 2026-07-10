import axios from "axios";
import { config } from "../../config/config";

const API_BASE_URL = config.apiBaseUrl;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // This is what allows your HTTP-only cookies to be sent with every request!
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000 // 10 seconds timeout is good practice
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can attach dynamic data here before request is sent
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Automatically unwrap the response data so you don't have to do res.data in components
        return response?.data;
    },
    async (error) => {
        const originalRequest = error?.config;
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Something went wrong. Please try again.";

        // Do not attempt to refresh if the error came from login, signup, or refresh itself
        const isAuthEndpoint = originalRequest.url?.includes('/auth/signin') || 
                               originalRequest.url?.includes('/auth/signup') || 
                               originalRequest.url?.includes('/auth/refresh');

        // If the error is 401 (Unauthorized) and we haven't tried to refresh yet
        if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops

            try {
                // Attempt to get a new access token via the refresh endpoint
                await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, { withCredentials: true });
                
                // If successful, the new accessToken is set in the HTTP-only cookie automatically
                // We can now safely retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.warn("[Axios] Refresh token failed or expired. Redirecting to login.");
                
                if (window.location.pathname !== "/signin") {
                    window.location.href = "/signin";
                }
                
                return Promise.reject(refreshError);
            }
        }

        // Standardize the error object returned to the catch() block in your components
        return Promise.reject({ status, message, originalError: error });
    }
);

export default axiosInstance;
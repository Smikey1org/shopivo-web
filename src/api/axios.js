import axios from "axios";

const apiClient = axios.create({
    baseURL: "/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach access token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("shopivo_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle common API errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle expired or invalid authentication.
            // Add redirect/refresh-token logic here if needed.
        }

        return Promise.reject(error);
    }
);

export default apiClient;
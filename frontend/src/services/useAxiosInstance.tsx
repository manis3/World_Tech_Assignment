import { BASE_URL } from '@/consts/baseUrl';
import axios from 'axios';

export default function useAxiosInstance() {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor to add token in headers
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            console.log(token, "token attached to the request")
            if (token) {
                config.headers.Authorization = ` ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor to handle token expiration or invalid token
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Handle Unauthorized error (e.g., clear token and redirect to login)
                console.log('Token expired or invalid. Logging out...');
                localStorage.removeItem('token');
                // Optionally redirect to the login page
                window.location.href = '/login';  // Adjust based on your app's routing
            }
            return Promise.reject(error);
        }
    );

    return {
        axiosInstance: axiosInstance
    };
}

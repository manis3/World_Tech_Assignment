import { BASE_URL } from '@/consts/baseUrl';
import axios from 'axios';

export default function useAxiosInstance() {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });


    //request interceptor to add token in headers 
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    //Response interceptor to handle every request globally;

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem('token');

            }
            return Promise.reject(error)
        }
    )

    return {
        axiosInstance: axiosInstance
    }

}




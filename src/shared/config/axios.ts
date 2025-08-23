import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { CONFIG } from '.';
import { ServerResponse } from '@/context/AuthContext';

const API = axios.create({
    baseURL: CONFIG.baseURL,
});

const AuthAPI = axios.create({
    baseURL: CONFIG.baseURL,
});

API.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await SecureStore.getItemAsync('refresh_token');
                if (refreshToken) {
                    // Call the refresh token endpoint
                    const response = await AuthAPI.post(`/auth/refresh-token`, {
                        refreshToken: refreshToken,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`,
                        }
                    });

                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } : ServerResponse= response.data;
            
                    await SecureStore.setItemAsync('access_token', newAccessToken);
                    await SecureStore.setItemAsync('refresh_token', newRefreshToken);
                    console.log("Refreshing going on!");
                    API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return API(originalRequest);
                } else {
                    throw new Error('No refresh token available. Please log in again.');
                }
            } catch (refreshError) {
                console.log("Error of refreshing");
                await SecureStore.deleteItemAsync('access_token');
                await SecureStore.deleteItemAsync('refresh_token');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { API };
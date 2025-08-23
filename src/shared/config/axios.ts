import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { CONFIG } from ".";
import * as SecureStore from 'expo-secure-store';

export const API = axios.create({
    baseURL: CONFIG.baseURL,
});

const onRequest = async (config: InternalAxiosRequestConfig<any>) => {
    const data = JSON.stringify(config.data, null, 2);
    console.log(`[!] ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`Body=${data}`);
    return config;
}

API.interceptors.request.use(onRequest);


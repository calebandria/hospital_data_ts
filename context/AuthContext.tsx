import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API } from '@/src/shared/config/axios';
import { CONFIG } from '@/src/shared/config';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isInitialized: boolean | null,
    isLoading: boolean;
    error: Error | null;
    userRole: string | null;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
    checkCode: (code: string) => void;
    signUp: (username: string, password: string, code: number) => void
    codeChecked: number | null;
}

export type ServerResponse = {
    username: string,
    role: string
    accessToken: string
    refreshToken: string
}

type CodeCheckingResponse = {
    role: string,
    identification: number
}

type RegistrationResponse = {
    message: string
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null)
    const [userRole, setUserRole] = React.useState<string | null>('');
    const [isInitialized, setIsInitialized] = React.useState<boolean | null>(null);
    const [codeChecked, setCodeChecked] = React.useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            if (isInitialized) return;

            try {
                setIsLoading(true);
                const storedToken = await SecureStore.getItem('access_token');
                if (storedToken) {
                    console.log("User already logged in");
                    setIsInitialized(true);
                    //await setAuthHeader();

                }
                else {
                    console.log("No user logged")
                }
            }
            catch (err) {
                console.error("Error of initialization: ", err);
            }
            finally {
                setIsLoading(false);
            }
        }

        initializeAuth()
    }, [])

    const signIn = React.useCallback(async (username: string, password: string) => {
        setIsLoading(true);
        setError(null)
        try {
            const userResult = await API.post('/auth/login', { username, password });
            const response: ServerResponse = userResult.data
            await SecureStore.setItemAsync('username', response.username);
            await SecureStore.setItemAsync('access_token', response.accessToken);
            await SecureStore.setItemAsync('refresh_token', response.refreshToken);
            await SecureStore.setItemAsync('role', response.role);
            setIsAuthenticated(true);
            try {
                setUserRole(response.role);
            }
            catch (e) {
                console.log(e);
            }

            // await setAuthHeader();

            if (response.role === 'ADMIN') {
                router.replace('/(admin)')
                console.log("The user role is: ", userRole)
            } else
                if (response.role === 'COGE') {
                    router.replace('/(coge)')
                    console.log("The user role is: ", userRole)
                }
                else {
                    console.log("The user role is: ", userRole)
                }

            return "Login successful";
        }
        catch (err) {
            if (err instanceof Error) {
                throw (err)
            }
            else {
                throw (new Error("An unknown error occured"));
            }
        }
    }, [isLoading, error, userRole]);

    const signUp = React.useCallback(async (username: string, password: string, identification: number) => {
        setIsLoading(true);
        setError(null)
        try {
            const userResult = await API.post('/auth/register', { username, password, identification });
            const response: RegistrationResponse = userResult.data

            return "Registration successful";
        }
        catch (err) {
            if (err instanceof Error) {
                throw (err)
            }
            else {
                throw (new Error("An unknown error occured"));
            }
        }
    }, [isLoading, error]);

    const setAuthHeader = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log('Token successfully set in headers.');
            } else {
                console.log('No token found in secure store.');
            }
        } catch (error) {
            console.error('Failed to set auth header:', error);
        }
    };

    const checkCode = React.useCallback(async (code: string) => {
        setIsLoading(true);
        setError(null)

        try {
            const { data } = (await axios.get(`${CONFIG.baseURL}identification/validate-code/${code}`));
            setCodeChecked(data.identification);
            //console.log(codeChecked);
        }

        catch (err) {
            if (err instanceof Error) {
                throw (err);
            }
            else {
                throw (new Error("An unknown error occured"));
            }
        }
    }, [isLoading, error])

    const signOut = async () => {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        const logoutResponse = await API.post('/auth/logout', {
            refreshToken: refreshToken
        })
        try {

            await SecureStore.deleteItemAsync('role');
            await SecureStore.deleteItemAsync('username');
            await SecureStore.deleteItemAsync('refresh_token');
            await SecureStore.deleteItemAsync('access_token');
            setIsAuthenticated(false);
            setUserRole(null);
            router.replace('/(public)/login');
            return logoutResponse.data.message
        } catch (e) {
            console.error(e);
            throw (e);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isInitialized,
        isLoading,
        error,
        userRole,
        checkCode,
        signIn,
        signOut,
        signUp,
        codeChecked
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


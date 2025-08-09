import React from 'react';
import { useRouter } from 'expo-router';
import users from "@/utils/users_data.json";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    error: Error | null
    userRole: string | null;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

type ServerResponse = {
    username: string,
    role: string
    accessToken: string
    refreshToken: string
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
    const router = useRouter()

    const signIn = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null)
        try {
            const userResult = await axios.post('http://10.0.2.2:8080/api/auth/login', { username, password});
            const response: ServerResponse = userResult.data
            await SecureStore.setItemAsync('username', response.username);
            await SecureStore.setItemAsync('access_token', response.accessToken);
            await SecureStore.setItemAsync('refresh_token', response.refreshToken);
            await SecureStore.setItemAsync('role', response.role);
            setIsAuthenticated(true);
            setUserRole(response.role);

            if (response.role === 'ADMIN'){
                router.push('/(admin)')
            }
            else{
                console.log("The user role is: ",userRole)
                router.replace('/(public)')
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
    };

    const signOut = async () => {
        try {
 
            await SecureStore.deleteItemAsync('role');
            await SecureStore.deleteItemAsync('username');
            await SecureStore.deleteItemAsync('refresh_token');
            await SecureStore.deleteItemAsync('access_token');
            setIsAuthenticated(false);
            setUserRole(null);
            router.replace('/(public)/login');
            return "Déconnexion"
        } catch (e) {
            throw (e);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        error,
        userRole,
        signIn,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


import React from 'react';
import { useRouter } from 'expo-router';
import users from "@/utils/users_data.json";
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    error: Error | null
    userRole: string | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

type ServerResponse = {
    username: string,
    role: string
    access_token: string
    refresh_token: string
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const sendCredential = (username: string, password: string): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let userFound = users.filter((userInfo) => {
                return (userInfo.username === username && userInfo.password === password);
            });

            if (userFound.length > 0) {
                resolve({
                    username: userFound[0].username,
                    role: userFound[0].role,
                    access_token: userFound[0].acces_token,
                    refresh_token: userFound[0].refresh_token
                });
            } else {
                reject(new Error("Nom d'utilisateur ou mot de passe erroné"));
            }
        }, 1000);
    });
};


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null)
    const [userRole, setUserRole] = React.useState<string | null>('');
    const router = useRouter()

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null)
        try {
            const userResult: ServerResponse = await sendCredential(email, password);
            await SecureStore.setItemAsync('username', userResult.username);
            await SecureStore.setItemAsync('access_token', userResult.access_token);
            await SecureStore.setItemAsync('refresh_token', userResult.refresh_token);
            await SecureStore.setItemAsync('role', userResult.role);
            setIsAuthenticated(true);
            setUserRole(userResult.role);

            if (userResult.role === 'admin'){
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


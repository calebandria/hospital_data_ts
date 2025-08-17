import { useAuth } from "@/context/AuthContext";
import { router, useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthGuardProps {
    children: React.ReactNode,
    role: string
}

const AuthGuard = ({ children, role }: AuthGuardProps) => {
    const { userRole, isLoading, isInitialized } = useAuth();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!isInitialized || isLoading || !navigationState?.key) {
            return;
        }

        if (!role || userRole !== role) {
            console.log("AuthGuard: Access denied, redirecting to login", {
                userRole: userRole,
                requiredRole: role

            });

            const timeout = setTimeout(() => {
                router.replace("/(public)/login");
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isInitialized, isLoading, userRole, navigationState])

   /*  if (!isInitialized || isLoading || !navigationState?.key) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } */

    if (!userRole || userRole !== role) {
        return null;
    }

    return <>{children}</>
}

export default AuthGuard;
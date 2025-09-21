import { useAuth } from "@/context/AuthContext";
import { router, useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthGuardProps {
    children: React.ReactNode,
    role: string
}

const AuthGuard = ({ children, role }: AuthGuardProps) => {
    const { signOut, isAuthenticated, userRole } = useAuth();
    useEffect(() => {
        const checkGuard = async () => {
            if (!role || userRole !== role) {
                console.log("AuthGuard: Access denied, redirecting to login", {
                    userRole: userRole,
                    requiredRole: role

                });

              /*   try {
                    await signOut();
                }
                catch (err) {
                    console.log("Force sign-out error", err)
                } */

            }

        }

        checkGuard();
    }, [isAuthenticated, userRole])

    if (!userRole || userRole !== role) {
        return null;
    }

    return <>{children}</>
}

export default AuthGuard;
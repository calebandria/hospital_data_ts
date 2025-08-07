import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import * as SecureStore from 'expo-secure-store';
const AdminScreen = ()=>{
    const {signOut} = useAuth();
    const username = SecureStore.getItemAsync('username');
    const handleSignout = async () =>{
        try{
            const message = await signOut();
            console.log(message);
        }
        catch(err) {
            console.log(err);
        }
    }
    return(
        <View style={{flex: 1}}>
            <Text>
                This is the admin main page. Welcome {username}
            </Text>
            <TouchableOpacity 
            style={{backgroundColor: '#DD2E44'}}
            onPress={handleSignout}
            >
                <Text>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AdminScreen;
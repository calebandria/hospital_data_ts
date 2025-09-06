import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Text, View } from "react-native";


const Signup = () =>{

    const { codeChecked } = useAuth();
    console.log("Code checked here is : ",codeChecked);

    return(
        <View>
            <Text>This is the signup page</Text>
        </View>
    )
}
export default Signup;
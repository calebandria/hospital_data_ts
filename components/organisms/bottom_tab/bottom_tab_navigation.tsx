import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export type Tabs = {
    name: string;
    icon: ComponentProps<typeof Ionicons>["name"];
    label: string;
}

type TabName = string;

export interface BottomTabNavigationDispensateurProps {
    tabs: Tabs [];
    onTabPress : (tab: TabName) => void
    activeIndex: number;
}

export function BottomTabNvigationDispensateur({
    tabs, 
    onTabPress, 
    activeIndex
}: BottomTabNavigationDispensateurProps){
 
    return (
        <View style={{flex:1}}>
            <Text>Here should be the bottom</Text>

        </View>
    )
}
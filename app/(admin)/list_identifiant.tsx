import Table from "@/components/Table";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TableData = {
    id: string;
    name: string;
    age: number;
};

const ListIdentifant = () => {
    const data: TableData[] = [
        { id: '1', name: 'Alice', age: 30 },
        { id: '2', name: 'Bob', age: 25 },
        { id: '3', name: 'Charlie', age: 35 },
        { id: '4', name: 'Diana', age: 28 },
        { id: '5', name: 'Edward', age: 42 },
        { id: '6', name: 'Fiona', age: 22 },
        { id: '7', name: 'George', age: 50 },
        { id: '8', name: 'Hannah', age: 19 },
        { id: '9', name: 'Isaac', age: 60 },
        { id: '10', name: 'Jasmine', age: 31 },
        { id: '11', name: 'Kevin', age: 45 },
        { id: '12', name: 'Laura', age: 33 },
        { id: '13', name: 'Michael', age: 29 },
        { id: '14', name: 'Nancy', age: 38 },
        { id: '15', name: 'Oscar', age: 55 },
        { id: '16', name: 'Pamela', age: 27 },
        { id: '17', name: 'Quentin', age: 41 },
        { id: '18', name: 'Rachel', age: 24 },
        { id: '19', name: 'Steve', age: 36 },
        { id: '20', name: 'Tina', age: 49 },
        { id: '21', name: 'Victor', age: 53 },
        { id: '22', name: 'Wendy', age: 21 },
        { id: '23', name: 'Xavier', age: 37 },
        { id: '24', name: 'Yara', age: 26 },
        { id: '25', name: 'Zachary', age: 40 },

    ];

    return (
        <View style={styles.container_1}>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerBackVisible: false
                }}
            />
            <Image
                style={styles.imageView}
                source={require("@/assets/images/logo_h_small.jpg")}
                placeholder="Image should be here"
            />
            <Text style={styles.text}>Vous intéragissez en tant</Text>
            <Text style={[styles.text, { marginBottom: 20 }]}>qu'admin</Text>
            <View style={styles.screenContainer}>
                <ScrollView>
                    <Table>
                        <TableRow>
                            <TableCell isHeader>N°</TableCell>
                            <TableCell isHeader>Expire le</TableCell>
                        </TableRow>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.age}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFF',
    },
    imageView: {
        flex: 1,
        maxHeight: '20%',
        width: '30%',
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: '#3E3C56',
        cursor: 'pointer',
        textTransform:'uppercase'
    },
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffff',
    }
})

export default ListIdentifant;
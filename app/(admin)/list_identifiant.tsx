import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { router, Stack } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Table from "@/components/Table";
import TableCell from "@/components/TableCell";
import TableRow from "@/components/TableRow";
import { API } from "@/src/shared/config/axios";

// Corrected type definition
export type TableData = {
    id: number;
    identification: number;
    user: null;
};

// No props are needed for this screen component
const ListIdentifant = React.memo(() => {

    const [identifiants, setIdentifiants] = React.useState<TableData[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/identification/free');
                setIdentifiants(response.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once

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
                    headerBackVisible: false,
                }}
            />
            <Image
                style={styles.imageView}
                source={require("@/assets/images/logo_h_small.jpg")}
                placeholder="Image should be here"
                contentFit="contain"
            />
            <Text style={styles.text}>Vous intéragissez en tant</Text>
            <Text style={[styles.text, { marginBottom: 20 }]}>qu'admin</Text>
            <View style={styles.screenContainer}>
                <ScrollView>
                    <Table>
                        <TableRow>
                            <TableCell isHeader>N°</TableCell>
                            <TableCell isHeader>ID</TableCell>
                        </TableRow>
                        {loading && <Text>Chargement en cours...</Text>}
                        {identifiants && identifiants.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.identification}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </ScrollView>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container_1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFF',
    },
    imageView: {
        maxHeight: '20%',
        width: '30%',
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: '#3E3C56',
        textTransform: 'uppercase',
    },
    screenContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: '#ffff',
    },
});

export default ListIdentifant;
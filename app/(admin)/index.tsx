import identifiers from "@/utils/identifier_data.json";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link,router, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AdminScreen = () => {
    const [identifiant, setIdentifiant] = React.useState<number>();
    const [clicked, setClicked] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [ok, setOk] = React.useState<string | null>(null);

    

    const generateIdentifiant = () => {
        let generatedNumber = Math.floor(100000 + Math.random() * 900000);
        setIdentifiant(generatedNumber);
        setClicked(true);
        setError(null);
        setOk(null);
    }

    const generateIdentifiant2 = () => {
        let numbers = [102896, 485975, 454151]
        setIdentifiant(numbers[Math.floor(Math.random() * numbers.length)])
        setClicked(true);
        setError(null);
        setOk(null);
    }

    const sendIdentifiant = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userFound = identifiers.filter((user) => {
                    return user.identifier == identifiant;
                });

                if (userFound.length == 0) {
                    resolve("Identifiant enregistré");
                }

                else {
                    reject(new Error("Erreur! Identifiant existant!"));
                }
            }, 3000);
        })

    }

    const handleIdentifiant = async () => {
        setLoading(true);
        setError(null);

        try {
            const resultResponse = await sendIdentifiant();
            setIdentifiant(undefined);
            setOk(resultResponse);
            setClicked(false);
        }
        catch (err) {
            if (err instanceof (Error)) {
                setError(err);
            }
            else {
                setError(new Error("An unknown error occured"));
            }

        }
        finally {
            setLoading(false);
        }

    }

    return (
        <View style={styles.upper_container}>
            <View style={styles.container_1}>
                <Stack.Screen
                    options={{
                        headerTitle: '',
                        headerShadowVisible: false
                    }}
                />
                <Image
                    style={styles.imageView}
                    source={require("@/assets/images/logo_h_small.jpg")}
                    placeholder="Image should be here"
                />
                <Text style={styles.text}>Vous intéragissez en tant</Text>
                <Text style={[styles.text, { marginBottom: 20 }]}>qu'admin</Text>

                <Pressable style={styles.button} onPress={generateIdentifiant}>
                    <Text style={styles.text_in_button}>Générer identifiant</Text>
                </Pressable>
                {clicked && <Text style={styles.text_toggle}>Le changer ? Cliquer une nouvelle fois</Text>}
                {clicked && <Text>sur le bouton ci-dessus</Text>}
                <View style={styles.container_2}>
                    <Pressable style={[styles.clickable_send, clicked && { right: -60, top: '50%' }]}
                        disabled={!clicked !== Boolean(error)}
                        onPress={handleIdentifiant}
                    >
                        <MaterialCommunityIcons
                            name={'send'}
                            size={20}
                            style={[styles.icon_send, clicked && { color: "#55ACEE" }, error && { color: "#3E3C56" }]}

                        />
                    </Pressable>
                    <Text style={[styles.text_generated, clicked && { marginTop: 20 }, error && { color: "#DD2E44" }]}>{identifiant}</Text>

                </View>
                <View style={[{ borderBottomColor: 'black', borderBottomWidth: 1, width: '50%' }, error && { borderBottomColor: '#DD2E44' }]} />
                {loading && <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#0E1B25" />}
                {error && <Text style={styles.errorText}><MaterialIcons name="error-outline" size={15} color="#DD2E44" style={{ marginRight: 2 }} />{" " + error.message}</Text>}
                {ok && <Text style={styles.sucess_text}><MaterialIcons name="check-circle-outline" size={15} color="#12631fff" style={{ marginRight: 2 }} />{" " + ok}</Text>}
            </View>
            <Pressable style={styles.view_list} >
                <Link style={styles.view_list_text} href={'/list_identifiant'}>
                    Voir la liste d'attente d'inscription
                </Link>
            </Pressable>
        </View>

    )
}
const styles = StyleSheet.create({
    upper_container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    logout: {
        bottom: 0,
        alignSelf: 'flex-end',
        marginRight: 20,

    },
    logout_text: {
        textDecorationLine: 'underline',
        color: "#DD2E44"
    },

    view_list: {
        alignSelf: 'flex-end',
        marginBottom: 50,
        marginRight: 20
    },
    view_list_text: {
        color: "#3B88C3",
        textDecorationLine: 'underline'
    },
    container_1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFF',
    },
    container_2: {
        flexDirection: 'row',
        position: 'relative'

    },
    clickable_send: {
        position: 'absolute',
        right: -140,
        top: '70%',
    },
    icon_send: {
        color: '#3E3C56',
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: '#3E3C56',
        cursor: 'pointer',
        textTransform:'uppercase',
    },
    text_generated: {
        fontSize: 30,
        letterSpacing: 10,
        color: '#3E3C56',
        cursor: 'pointer',
        marginTop: 60
    },
    text_toggle: {
        marginTop: 20
    },
    imageView: {
        flex: 1,
        maxHeight: '20%',
        width: '30%',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        height: 40,
        width: '70%',
        marginBottom: 20,
        borderRadius: 10
    },
    input_2: {
        borderWidth: 1,
        padding: 10,
        height: 40,
        width: '70%',
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        flexDirection: 'column',
        padding: 17,
        width: '50%',
        backgroundColor: "#0E1B25",
        borderRadius: 30

    },
    text_in_button: {
        textAlign: 'center',
        color: '#ffff',
        fontSize: 20
    },
    errorText: {
        color: '#DD2E44',
        margin: 10,
        textAlign: 'center',
    },
    sucess_text: {
        color: '#12631fff',
        margin: 10,
        textAlign: 'center',
    },
});

export default AdminScreen;
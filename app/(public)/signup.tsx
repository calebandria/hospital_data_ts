import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const Signup = () => {

    const { signIn } = useAuth();

    const [code, setCode] = React.useState<string>('');
    const [isPasswordVisible, setIsPasswordVisble] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);

    const isButtonDisabled = !code 

    const loginUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const message = await signIn(username, password);
            console.log(message)
        }
        catch (err) {
            if (err instanceof Error) {
                console.log("Login failed: ", err.message);
                setError(err);
            }
            else {
                setError(new Error("An unknow error occured"));
            }
        }
        finally {
            setLoading(false);
            setCode('');
        }
    }

    return (
        <View style={styles.container_1}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerShown: true
                }}
            />
            <Image
                style={styles.imageView}
                source={require("@/assets/images/logo_h_small.jpg")}
                placeholder="Image should be here"
            />
            <Text style={styles.text}>Inscrivez-vous</Text>
            <TextInput
                style={[styles.input, { borderColor: error ? '#DD2E44' : 'black' }]}
                placeholder="Code"
                onChangeText={(code) => {
                    setCode(code);
                    setError(null);
                }}
                value={code}
            />
            {error && <Text style={styles.errorText}><MaterialIcons name="error-outline" size={15} color="#DD2E44" style={{ marginRight: 2 }} />{" " + error.message}</Text>}
            <Text style={styles.text_welcome}>Entrez le code qui vous a été assigné par </Text>
            <Text style={styles.text_welcome}>l’administrateur</Text>

            <TouchableOpacity
                style={[styles.button, { opacity: isButtonDisabled ? 0.8 : 1 }]}
                onPress={loginUser}
                disabled={isButtonDisabled || loading}
            >
                <Text style={styles.text_in_button}>
                    Valider {loading && <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#ffff" />}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container_1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF',
    },
    container_2: {
        flexDirection: 'row',
        position: 'relative'

    },
    eye: {
        fontSize: 12,
        position: 'absolute',
        right: '3%',
        top: '20%',
    },
    text: {
        fontSize: 28,
        fontWeight: '900',
        color: '#3E3C56',
        marginBottom: 20,
        cursor: 'pointer'
    },
    imageView: {
        flex: 1,
        maxHeight: '20%',
        width: '40%',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        height: 40,
        width: '70%',
        marginBottom: 20,
        borderRadius: 10,
        letterSpacing: 5
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
        width: '40%',
        marginTop: 20,
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
        marginBottom: 10,
        marginLeft: 5,
        textAlign: 'center',
    },
    text_welcome: {
        color: "#776868"
    },
});

export default Signup;
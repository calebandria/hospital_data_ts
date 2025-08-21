import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const Login = () => {

    const { signIn } = useAuth();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisble] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);

    const isButtonDisabled = !username || !password;

    const toggleVisibility = () => {
        setIsPasswordVisble(!isPasswordVisible);
    }

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
            setUsername('');
            setPassword('');
        }
    }

    return (
        <View style={styles.container_1}>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle:'',
                    headerShadowVisible:false
                }}
            />
            <Image
                style={styles.imageView}
                source={require("@/assets/images/logo_h_small.jpg")}
                placeholder="Image should be here"
            />
            <Text style={styles.text}>Connectez-vous</Text>
            <TextInput
                style={[styles.input, { borderColor: error ? '#DD2E44' : 'black' }]}
                placeholder="Nom d'utilisateur"
                onChangeText={(username) => {
                    setUsername(username);
                    setError(null);
                }}
                value={username}
            />
            <View style={styles.container_2}>
                <TextInput
                    style={[styles.input_2, { borderColor: error ? '#DD2E44' : 'black' }]}
                    placeholder="Mot de passe"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(password) => {
                        setPassword(password);
                        setError(null);
                    }}
                    value={password}
                />

                <Pressable style={styles.eye} onPress={toggleVisibility}>
                    <MaterialCommunityIcons
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={15}
                        color={error ? '#DD2E44' : 'black'}
                    />
                </Pressable>
            </View>
            {error && <Text style={styles.errorText}><MaterialIcons name="error-outline" size={15} color="#DD2E44" style={{ marginRight: 2 }} />{" " + error.message}</Text>}

            <TouchableOpacity
                style={[styles.button, { opacity: isButtonDisabled ? 0.8 : 1 }]}
                onPress={loginUser}
                disabled={isButtonDisabled || loading}
            >
                <Text style={styles.text_in_button}>
                    Se connecter {loading && <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#ffff" />}
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
        marginBottom: 10,
        marginLeft: 5,
        textAlign: 'center',
    },
});

export default Login;
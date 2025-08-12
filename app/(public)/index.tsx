import { Image } from 'expo-image';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

const HomeScreen = () => {

  return (
    <View style={styles.container_1}>
      <Stack.Screen
        options={{
          headerShown:false
        }}
      />
      <Image
        style={styles.imageView}
        source={require("@/assets/images/logo_h_small.jpg")}
        placeholder="Image should be here"
      />
      <Text style={styles.text}>Bienvenue</Text>
      <Text style={styles.text_welcome}>
        L’application qui facilite la gestion
      </Text>
      <Text style={styles.text_welcome}>
        des données des CSB
      </Text>
      <TouchableOpacity style={styles.button}>
        <Link style={styles.text_in_button} href="../(admin)/">Commencer maintenant</Link>
      </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
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
    maxHeight: '30%',
    width: '50%',
  },
  text_welcome: {
    color: "#776868"
  },
  button: {
    marginTop: 22,
    flexDirection: 'column',
    padding: 17,
    width: '75%',
    backgroundColor: "#0E1B25",
    borderRadius: 30
  },
  text_in_button: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 20
  }
})
export default HomeScreen;
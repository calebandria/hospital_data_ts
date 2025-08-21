import AuthGuard from '@/components/guard/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


export default function AdminLayout() {

  const { signOut } = useAuth();

  const handleSignout = async () => {
    try {
      const message = await signOut();
      console.log(message);
    }
    catch (err) {
      console.log(err);
    }

  }
  return (
  /*   <AuthGuard role='ADMIN'> */
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => (
              <Pressable style={styles.logout} onPress={handleSignout}>
                <Text style={styles.logout_text}>
                  <MaterialCommunityIcons
                    name={'logout-variant'}
                    size={20}
                    style={[{ color: '#DD2E44' }]}
                  />
                  <Text style={{ marginLeft: 5 }}>Se déconnecter</Text>
                </Text>
              </Pressable>
            ),
            headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="list_identifiant"
          options={{
            headerRight: () => (
              <Pressable style={styles.logout} onPress={handleSignout}>
                <Text style={styles.logout_text}>
                  <MaterialCommunityIcons
                    name={'logout-variant'}
                    size={20}
                    style={[{ color: '#DD2E44' }]}
                  />
                  <Text style={{ marginLeft: 5 }}>Se déconnecter</Text>
                </Text>
              </Pressable>
            ),
          }}
        />
      </Stack>
/*     </AuthGuard> */
  );
}
const styles = StyleSheet.create({
  logout: {
    marginRight: 15,
  },
  logout_text: {
    color: '#DD2E44',
    flexDirection: 'row',
    alignItems: 'center',
    textDecorationLine: 'underline'
  },
});

import AuthGuard from '@/components/guard/AuthGuard';
import LogoutButton from '@/components/LogoutButton';
import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {

  return (
    <AuthGuard role='ADMIN'>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => (
              <LogoutButton />
            ),
            headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="list_identifiant"
          options={{
            headerRight: () => (
              <LogoutButton />
            ),
          }}
        />
      </Stack>
    </AuthGuard>
  );
}


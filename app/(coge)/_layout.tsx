import AuthGuard from '@/components/guard/AuthGuard';
import LogoutButton from '@/components/LogoutButton';

import { Stack } from 'expo-router';
import React from 'react';
export default function CogeLayout() {
  return (
    <AuthGuard role='COGE'>
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
      </Stack>
    </AuthGuard>
  );
}

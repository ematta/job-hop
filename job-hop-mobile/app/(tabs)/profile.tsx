import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      {user.user_metadata?.avatar_url && (
        <Image
          source={{ uri: user.user_metadata.avatar_url }}
          style={styles.avatar}
        />
      )}
      <ThemedText type="subtitle">{user.email}</ThemedText>
      <Button
        title="Logout"
        onPress={async () => {
          await logout();
          router.replace('/login');
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
});

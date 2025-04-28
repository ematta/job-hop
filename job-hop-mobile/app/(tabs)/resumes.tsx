import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ResumesScreen() {
  const resumes = [
    { name: 'Resume_JohnDoe.pdf' },
    { name: 'Resume_JaneDoe.pdf' },
    { name: 'Resume_RichardRoe.pdf' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.list}>
          {resumes.map((res, idx) => (
            <TouchableOpacity key={idx} style={styles.card} onPress={() => {}}>
              <ThemedText type="subtitle">{res.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  list: { paddingBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
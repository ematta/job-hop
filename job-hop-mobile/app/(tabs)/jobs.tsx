import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function JobsScreen() {
  const [search, setSearch] = useState('');
  const jobs = [
    { company: 'Google', title: 'Software Engineer' },
    { company: 'Microsoft', title: 'Product Manager' },
    { company: 'Amazon', title: 'Data Scientist' },
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
        <View style={styles.topBar}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search jobs"
            value={search}
            onChangeText={setSearch}
          />
          <Button title="Add Job" onPress={() => {}} />
          <Button title="Upload Resume" onPress={() => {}} />
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          {jobs.map((job, idx) => (
            <TouchableOpacity key={idx} style={styles.card} onPress={() => {}}>
              <Text style={styles.company}>{job.company}</Text>
              <Text style={styles.title}>{job.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  searchBar: { flex: 1, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, height: 40 },
  list: { paddingBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  company: { fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 14, color: '#555', marginTop: 4 },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
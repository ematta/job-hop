import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image, Button, Alert, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '@/utils/supabase';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

export default function ResumesScreen() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [viewingResume, setViewingResume] = useState<string | null>(null);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.length) return;
      const file = result.assets[0];
      if (file.size && file.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file under 5MB.');
        return;
      }
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'docx'].includes(fileExt || '')) {
        Alert.alert('Invalid file type', 'Only PDF or DOCX files are allowed.');
        return;
      }
      // Read file as blob
      const fileUri = file.uri;
      const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      const contentType = file.mimeType || (fileExt === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      const base64Blob = Buffer.from(fileData, 'base64');
      // Upload to Supabase
      const userId = 'user_id'; // TODO: Replace with actual user id from auth context
      const filePath = `${userId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('resumes').upload(filePath, base64Blob, {
        contentType,
        upsert: true,
      });
      if (error) {
        Alert.alert('Upload failed', error.message);
        return;
      }
      setResumes(prev => [...prev, { name: 'Default', path: filePath, type: contentType }]);
    } catch (e) {
      Alert.alert('Error', 'Failed to upload file.');
    }
  };

  const handleViewResume = (resume: any) => {
    setViewingResume(resume.path);
  };

  const handleCloseViewer = () => setViewingResume(null);

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
        <Button title="Upload Resume" onPress={handleUpload} />
        <ScrollView contentContainerStyle={styles.list}>
          {resumes.map((res, idx) => (
            <TouchableOpacity key={idx} style={styles.card} onPress={() => handleViewResume(res)}>
              <ThemedText type="subtitle">{res.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {viewingResume && (
          <ThemedView style={{ flex: 1, height: 500 }}>
            <Button title="Close" onPress={handleCloseViewer} />
            <WebView
              source={{ uri: supabase.storage.from('resumes').getPublicUrl(viewingResume).data.publicUrl }}
              style={{ flex: 1 }}
            />
          </ThemedView>
        )}
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

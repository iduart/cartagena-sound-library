import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';

export const getSoundFileKey = (soundId) => `${soundId}_sound_url`;
export const getSoundFileName = (soundId) => `${FileSystem.cacheDirectory}${soundId}.mp3`;

export const useSoundFileUri = (sound) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const getSoundFile = async () => {
    setLoading(true);
    let fileUri;
    const { sound: soundUrl } = sound;
  
    try {
      // check if file is already in cache
      const storedFileUri = await AsyncStorage.getItem(getSoundFileKey(sound._id));
      const cacheFile = await FileSystem.getInfoAsync(storedFileUri || '');
  
      if (cacheFile && cacheFile.exists && cacheFile.uri) {
        fileUri = cacheFile.uri;
      } else {
        //download and save in cache
        const file = await FileSystem.downloadAsync(soundUrl, getSoundFileName(sound._id));
        fileUri =  file.uri;
        await AsyncStorage.setItem(getSoundFileKey(sound._id), file.uri);
      }
      setLoading(false);
      return fileUri;
    } catch (e) {
      setError('Hubo un error encontrando este sonido');
    } 
  }

  return {
    loading,
    error,
    getSoundFile,
  }
}
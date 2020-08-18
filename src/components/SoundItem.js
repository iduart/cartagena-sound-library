import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import { useSoundFileUri } from '../utils/getSoundFile';

const Container = styled.View`
  height: 80px;
  margin-bottom: 10px;
  border: solid #FFFFFF 1px;
  border-radius: 22px;
  padding: 7px 15px 7px 7px;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const SoundItemPictureContainer = styled.View`
  height: 100%;
  padding-right: 10px;
  border-right-width: 2px;
  border-right-color: #FFFFFF;
  flex-basis: 23%;
`;

const SoundItemPicture = styled.ImageBackground`
  height: 100%;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SoundItemTextContainer = styled.View`
  padding: 10px;
  flex: 1;
`;

const SoundItemText = styled.Text`
  font-size: 18px;
  color: #FFFFFF;
  font-weight: bold;
`;

const SoundItemSubText = styled.Text`
  font-size: 14px;
  color: #FFFFFF;
  margin-top: 5px;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-basis: 15%;
`;

const TOGGLE_FAVORITE = gql`
  mutation toogleFavorite($deviceId: String!, $soundId: String!) {
    toogleDeviceFavorite(deviceId: $deviceId, soundId: $soundId)
  }
`;


const SoundItem = ({ sound = {}, ...props }) => {
  const [playing, setPlaying] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);
  const [soundObject, setSoundObject] = React.useState();
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, { variables: { deviceId: Constants.deviceId, soundId: sound._id } });
  const { thumbnail, name, author } = sound;

  const {
    getSoundFile,
    loading: soundUriLoading,
    error: soundUriError
  } = useSoundFileUri(sound);

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      setPlaying(false);
    }
  }

  const playSound = async () => {
    setPlaying(true);
    const soundUri = await getSoundFile();
    await soundObject.unloadAsync();
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await soundObject.loadAsync({ uri: soundUri });
    await soundObject.playAsync();
  }

  const stopSound = async () => { 
    resetSound();
    setPlaying(false);
  }

  const resetSound = async () => {
    await soundObject.stopAsync();
    await soundObject.setPositionAsync(0);
  }

  const shareSound = async () => {
    const soundUri = await getSoundFile();
    if (!soundUri || soundUriError) {
      alert("No se pudo compartir este sonido");
    }

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      Sharing.shareAsync(soundUri, {
        mimeType: 'audio/mpeg',
        dialogTitle: name,
        UTI: 'public.mp3',
      })
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toggleFavorite();
  }

  React.useEffect(() => {
    setSoundObject(new Audio.Sound());
  }, [])

  return (
    <Container>
      <SoundItemPictureContainer>
        <SoundItemPicture source={{ uri: thumbnail }}>
          {soundUriLoading && (
            <ActivityIndicator size="large" color="#FFFFFF" />
          )}
          {!playing && !soundUriLoading && (
            <TouchableWithoutFeedback onPress={playSound}>
              <Icon name="playcircleo" size={30} color="white" />
            </TouchableWithoutFeedback>
          )}
          {playing && !soundUriLoading && (
            <TouchableWithoutFeedback onPress={stopSound}>
              <Icon name="pausecircleo" size={30} color="white" />
            </TouchableWithoutFeedback>
          )}
        </SoundItemPicture>
      </SoundItemPictureContainer>
      <SoundItemTextContainer>
        <SoundItemText numberOfLines={1}>{name}</SoundItemText>
        <SoundItemSubText numberOfLines={1}>{author}</SoundItemSubText>
      </SoundItemTextContainer>
      <ActionsContainer>
        <TouchableOpacity onPress={handleToggleFavorite}>
          {isFavorite && <Icon name="heart" size={20} color="#e31b23" />}
          {!isFavorite && <Icon name="hearto" size={20} color="#FFFFFF" />}
        </TouchableOpacity>
        <TouchableOpacity onPress={shareSound}>
          <Icon name="sharealt" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </ActionsContainer>
    </Container>
  )
}

export default SoundItem;
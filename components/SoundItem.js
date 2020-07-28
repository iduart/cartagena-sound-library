import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import styled from 'styled-components';
import Images from '../images';
import Sounds from '../media';

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

const SoundItem = ({ sound = {} }) => {
  const [playing, setPlaying] = React.useState(false);
  const [soundObject, setSoundObject] = React.useState();
  const { thumbnail, name, code, author, sound: soundUrl } = sound;

  React.useEffect(() => {
    setSoundObject(new Audio.Sound());
  }, [])

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      setPlaying(false);
    }
  }

  const playSound = async () => {
    setPlaying(true);
    await soundObject.unloadAsync();
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await soundObject.loadAsync({ uri: soundUrl });
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
    const soundFile = Sounds[code];
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Asset.fromModule(soundFile).downloadAsync();
      const localUri = await Asset.fromModule(soundFile).localUri;

      Sharing.shareAsync(localUri, {
        mimeType: 'audio/mpeg',
        dialogTitle: name,
        UTI: 'public.mp3',
      })
    }
  }

  return (
    <Container>
      <SoundItemPictureContainer>
        <SoundItemPicture source={{ uri: thumbnail }}>
          {!playing && (
            <TouchableWithoutFeedback onPress={playSound}>
              <Icon name="playcircleo" size={30} color="white" />
            </TouchableWithoutFeedback>
          )}
          {playing && (
            <TouchableWithoutFeedback onPress={stopSound}>
              <Icon name="pausecircleo" size={30} color="white" />
            </TouchableWithoutFeedback>
          )}
        </SoundItemPicture>
      </SoundItemPictureContainer>
      <SoundItemTextContainer>
        <SoundItemText numberOfLines={1}>{name}</SoundItemText>
        <SoundItemSubText numberOfLines={1}>Créditos: {author}</SoundItemSubText>
      </SoundItemTextContainer>
      <ActionsContainer>
        <TouchableOpacity onPress={() => alert("Comming soon...")}>
          <Icon name="hearto" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareSound}>
          <Icon name="sharealt" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </ActionsContainer>
    </Container>
  )
}

export default SoundItem;
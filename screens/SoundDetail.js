import React from 'react';
import styled from 'styled-components/native';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import LogoHeader from '../components/LogoHeader';
import SoundItem from '../components/SoundItem';
import Sounds from '../media';

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`;

const IconContainer = styled.View`
  align-items: flex-end;
  padding-right: 10px;
  position: relative;
  top: -15px;
`;

const IconWithLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconLabel = styled.Text`
  font-size: 18px;
`;

const ICON_SIZE = 35;

const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 20px;
  width: 100%;
  align-items: center;
`;

const SoundDetail = ({ navigation, route }) => {
  const { params = {} } = route;

  const goHome = () => navigation.navigate('home');

  const shareAudio = async () => {
    const sound = Sounds[params.code];
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Asset.fromModule(sound).downloadAsync();
      const localUri = await Asset.fromModule(sound).localUri;

      Sharing.shareAsync(localUri, {
        mimeType: 'audio/mpeg',
        dialogTitle: params.text,
        UTI: 'public.mp3',
      })
    }
  }

  return (
    <SafeAreaContainer>
      <TouchableWithoutFeedback onPress={goHome}>
        <View>
          <LogoHeader />
        </View>
      </TouchableWithoutFeedback>
      <SoundItem sound={{ ...params }} />
      <IconContainer>
        <TouchableWithoutFeedback onPress={shareAudio}>
          <IconWithLabelContainer>
            <Icon name="share" size={ICON_SIZE} />
            <IconLabel>Compartir</IconLabel>
          </IconWithLabelContainer>
        </TouchableWithoutFeedback>
      </IconContainer>
      <TouchableWithoutFeedback onPress={goHome}>
        <Footer>
          <Icon name="home" size={40} color="#FF6700" /><Text>Inicio</Text>
        </Footer>
      </TouchableWithoutFeedback>
    </SafeAreaContainer>
  )
}

export default SoundDetail;
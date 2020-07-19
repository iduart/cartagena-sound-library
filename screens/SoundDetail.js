import React from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoHeader from '../components/LogoHeader';
import SoundItem from '../components/SoundItem';

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
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

  return (
    <SafeAreaContainer>
      <TouchableWithoutFeedback onPress={goHome}>
        <View>
          <LogoHeader />
        </View>
      </TouchableWithoutFeedback>
      <SoundItem sound={{...params}} />
      <IconsContainer>
        <Icon name="whatsapp" size={ICON_SIZE} />
        <Icon name="slack" size={ICON_SIZE} />
        <Icon name="download" size={ICON_SIZE} />
      </IconsContainer>
      <TouchableWithoutFeedback onPress={goHome}>
        <Footer>
          <Icon name="home" size={40} color="#FF6700" /><Text>Inicio</Text>
        </Footer>
      </TouchableWithoutFeedback>
    </SafeAreaContainer>
  )
}

export default SoundDetail;
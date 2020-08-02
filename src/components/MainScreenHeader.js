import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Logo from './Logo';
import HamburguerIcon from './Icons/HamburguerIcon';
import Clouds from './Clouds';

const HamburgerIconContainer = styled.TouchableOpacity`
  margin-left: 10px;
  margin-top: 10px;
  width: 38px;
  height: 26px;
  z-index: 1;
`

const StyledLogo = styled(Logo)`
  position: relative;
  margin-left: -10px;
  margin-top: -15px;
  width: 50px;
  z-index: 0;
`;

const CloudsBackground = styled(Clouds)`
  position: absolute;
  align-self: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const MainScreenHeader = () => {
  const navigation = useNavigation();

  return (
    <View>
      <CloudsBackground />
      <HamburgerIconContainer onPress={() => navigation.toggleDrawer()}>
        <HamburguerIcon />
      </HamburgerIconContainer>
      <StyledLogo />
    </View>
  )
}

export default MainScreenHeader;
import React from 'react';
import styled from 'styled-components/native';
import Logo from './Logo';
import HamburguerIcon from './Icons/HamburguerIcon';
import Clouds from './Clouds';

const ScreenContainer = styled.View`
  padding: 20px 10px;
`;

const Hamburger = styled(HamburguerIcon)`
  position: relative;
  top: 10px;
  left: 10px;
`

const StyledLogo = styled(Logo)`
  position: relative;
  left: -10px;
  top: -5px;
`;

const CloudsBackground = styled(Clouds)`
  position: absolute;
  align-self: center;
  margin-top: 30px;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const MainScreenHeader = () => {
  return (
    <ScreenContainer>
      <CloudsBackground />
      <Hamburger />
      <StyledLogo />
    </ScreenContainer>
  )
}

export default MainScreenHeader;
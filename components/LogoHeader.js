import React from 'react';
import styled from 'styled-components/native';
import logo from '../images/logo.png';

const Container = styled.View`
  align-items: center;
`;

const LogoImg = styled.Image`
  width: 95%;
  resize-mode: contain;
`;

const LogoHeader = () => {
  return (
    <Container>
      <LogoImg source={logo}></LogoImg>
    </Container>
  )
}

export default LogoHeader;
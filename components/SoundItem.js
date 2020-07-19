import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import Images from '../images';

const Container = styled.View`
  height: 350px;
  border: solid #FF6700 5px;
  padding: 15px;
  margin-bottom: 30px;
`;

const SoundItemPicture = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
`;

const SoundItemText = styled.View`
  height: 30px;
  flex-direction: row;
`;

const Link = styled.Text`
  color: ${props => props.color || '#000000'};
  text-decoration-line: underline
`;

const DecorativeColorBox = styled.View`
  background-color: ${props => props.color || 'white'};
  color: red;
  flex-grow: ${props => props.grow || 0};
  padding: 5px 10px;
`;

const SoundItem = ({ picture, name, onNamePress }) => {
  return (
    <Container>
      <SoundItemPicture source={Images[picture]}>
        <TouchableWithoutFeedback onPress={onNamePress}>
          <SoundItemText>
            <DecorativeColorBox color="#000000" grow="8">
              <Link color="#FFFFFF">{name}</Link>
            </DecorativeColorBox>
            <DecorativeColorBox color="#828282" />
            <DecorativeColorBox color="#3D3D3D" />
          </SoundItemText>
        </TouchableWithoutFeedback>
      </SoundItemPicture>
    </Container>
  )
}

export default SoundItem;
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Audio } from 'expo-av';
import styled from 'styled-components';
import Images from '../images';
import Sounds from '../media';

const Container = styled.View`
  height: 350px;
  border: solid #FF6700 5px;
  padding: 15px;
  margin-bottom: 30px;
`;

const SoundItemPicture = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;

const ControlIcon = styled(Icon)`
  align-self: center;
`;

const SoundItemText = styled.View`
  height: 45px;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Link = styled.Text`
  color: ${props => props.color || '#000000'};
  text-decoration-line: underline;
  font-size: 20px;
`;

const DecorativeColorBox = styled.View`
  background-color: ${props => props.color || 'white'};
  color: red;
  flex-grow: ${props => props.grow || 0};
  padding: 5px 10px;
  justify-content: center;
`;

const SoundItem = ({ sound = {}, handleNamePress }) => {
  const [playing, setPlaying] = React.useState(false);
  const [soundObject, setSoundObject] = React.useState();
  const { thumbnail, text, code } = sound;

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
    await soundObject.loadAsync(Sounds[code]);
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

  return (
    <TouchableWithoutFeedback onPress={playSound}>
      <Container>
        <SoundItemPicture source={Images[thumbnail]}>
          {!playing && <ControlIcon name="playcircleo" size={100} color="white" />}
           {playing && (
            <TouchableWithoutFeedback onPress={stopSound}>
              <ControlIcon name="pausecircleo" size={100} color="white" />
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={handleNamePress}>
            <SoundItemText>
              <DecorativeColorBox color="#000000" grow="8">
                <Link color="#FFFFFF">{text}</Link>
              </DecorativeColorBox>
              <DecorativeColorBox color="#828282" />
              <DecorativeColorBox color="#3D3D3D" />
            </SoundItemText>
          </TouchableWithoutFeedback>
        </SoundItemPicture>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default SoundItem;
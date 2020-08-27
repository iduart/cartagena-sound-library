import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import SoundItem from '../components/SoundItem';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(LinearGradient).attrs({
  colors: ['#FFE17E', '#F37578'],
  start: [0, 0],
  end: [1, 1],
})`
  padding-horizontal: 20px;
  flex: 1;
`;

const Title = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const TitleText = styled.Text`
  margin-left: 10px;
  font-size: 30px;
  color: #FFFFFF;
  font-weight: bold;
`;

const FormContainer = styled.View`
  padding-horizontal: 10px;
  margin-top: 50px;
`;

const FormField = styled.View`
  margin-bottom: 25px;
`;

const FormFieldLabel = styled.Text`
  font-size: 18px;
  color: #FFFFFF;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#FFFFFF',
})`
  padding-right: 10px;
  color: #FFFFFF;
  height: 40px;
  font-size: 16px;
  border: solid #FFFFFF 1px;
  height: 40px;
  border-radius: 10px;
  padding: 5px 15px;
`;

const RangeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  border: solid black 1px;
  height: 55px;
  width: 65%;
  border-radius: 25px;
  border: solid #FFFFFF 2px;
  background: rgba(255,255,255,0.3);
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 25px
`;

const PREVIEW_SOUND = gql`
  mutation previewSound($input: previewSoundInput!) {
    previewSound(input: $input) {
      _id
      name
      author
      sound
      thumbnail
    }
  }
`;

const CreateSoundPage = () => {
  const [previewSound, { data: previewSoundResponse, loading: previewSoundLoading }] = useMutation(PREVIEW_SOUND);

  const submit = () => {
    previewSound({
      variables: {
        input: {
          url: 'https://www.youtube.com/watch?v=CJH-QqrFHsU',
          from: '00:00:00',
          to: '8',
          name: "Duque pero que mondá",
          author: 'El Turner',
          deviceId: Constants.deviceId,
        }
      }
    })
  }

  return (
    <Container>
      <SafeArea>
        <Title>
          <Icon name="clouduploado" size={40} color="#FFFFFF" />
          <TitleText>SUBIR SONIDO</TitleText>
        </Title>
        <FormContainer>
          <FormField>
            <FormFieldLabel>Link de YouTube:</FormFieldLabel>
            <Input placeholder="Ej. https://www.youtube.com/watch?v=B2jvVuNaQ5g" />
          </FormField>
          <RangeContainer>
            <FormField>
              <FormFieldLabel>Desde:</FormFieldLabel>
              <Input placeholder="Ej. 00:01:34" maxLength={10} />
            </FormField>
            <FormField>
              <FormFieldLabel>Hasta:</FormFieldLabel>
              <Input placeholder="Ej. 00:01:40" maxLength={10} />
            </FormField>
          </RangeContainer>
          <FormField>
            <FormFieldLabel>Nombre del Audio:</FormFieldLabel>
            <Input placeholder="Ej. Que elegancia la de francia" />
          </FormField>
          <FormField>
            <FormFieldLabel>Autor:</FormFieldLabel>
            <Input placeholder="Ej. Moe - Los Simpsons" />
          </FormField>
          <FormField>
            {previewSoundLoading && (<ActivityIndicator size="large" color="#FFFFFF" />) }
            {previewSoundResponse && previewSoundResponse.previewSound && (
              <SoundItem sound={previewSoundResponse.previewSound} />
            )}
          </FormField>
          <ButtonContainer>
            <Button onPress={submit}>
              <ButtonText>Preview</ButtonText>
            </Button>
          </ButtonContainer>
        </FormContainer>
      </SafeArea>
    </Container>
  )
}

export default CreateSoundPage;
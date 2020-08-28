import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text'
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
  justify-content: space-between;
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

const InputMask = styled(TextInputMask).attrs({
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

const ErrorText = styled.Text`
  color: red;
  padding: 5px 0 0 5px;
`;

const RangeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  border: solid black 1px;
  height: 55px;
  width: 45%;
  border-radius: 20px;
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

const CreateSoundPage = (props) => {
  const [previewSound, { data: previewSoundResponse, loading: previewSoundLoading }] = useMutation(PREVIEW_SOUND);

  const submit = (values) => {
    const { url, from, to, name, author } = values;
    previewSound({
      variables: {
        input: {
          url,
          from,
          to,
          name,
          author,
          deviceId: Constants.deviceId,
        }
      }
    })
  }

  const validate = (values) => {
    const errors = {};

    if (!values.url) {
      errors.url = 'Requerido';
    }
    if (!values.name) {
      errors.name = 'Requerido';
    }
    if (!values.author) {
      errors.author = 'Requerido';
    }
    
    return errors;
  }

  return (
    <Container>
      <SafeArea>
        <Title>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Icon name="arrowleft" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TitleText>AGREGAR SONIDO</TitleText>
          <Icon name="arrowleft" size={40} color="transparent" />
        </Title>

        <Formik
          initialValues={{
            url: '',
            from: '00:00:00.00',
            to: '00:00:07.00',
            name: '',
            author: ''
          }}
          onSubmit={submit}
          validate={validate}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <FormContainer>
              <FormField>
                <FormFieldLabel>Link de YouTube:</FormFieldLabel>
                <Input
                  placeholder="Ej. https://www.youtube.com/watch?v=B2jvVuNaQ5g"
                  onChangeText={handleChange('url')}
                  value={values.url}
                />
                {errors.url && touched.url ? (
                  <ErrorText>{errors.url}</ErrorText>
                ) : null}
              </FormField>
              <RangeContainer>
                <FormField>
                  <FormFieldLabel>Desde:</FormFieldLabel>
                  <InputMask
                    type="datetime"
                    options={{
                      format: 'hh:mm:ss.SS'
                    }}
                    onChangeText={handleChange('from')}
                    value={values.from}
                  />
                  {errors.from && touched.from ? (
                    <ErrorText>{errors.from}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Hasta:</FormFieldLabel>
                  <InputMask
                    type="datetime"
                    options={{
                      format: 'hh:mm:ss.SS'
                    }}
                    onChangeText={handleChange('to')}
                    value={values.to}
                  />
                  {errors.to && touched.to ? (
                    <ErrorText>{errors.to}</ErrorText>
                  ) : null}
                </FormField>
              </RangeContainer>
              <FormField>
                <FormFieldLabel>Nombre del Audio:</FormFieldLabel>
                <Input
                  placeholder="Ej. Que elegancia la de francia"
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <ErrorText>{errors.name}</ErrorText>
                ) : null}
              </FormField>
              <FormField>
                <FormFieldLabel>Autor:</FormFieldLabel>
                <Input
                  placeholder="Ej. Moe - Los Simpsons"
                  onChangeText={handleChange('author')}
                  value={values.author}
                />
                {errors.author && touched.author ? (
                  <ErrorText>{errors.author}</ErrorText>
                ) : null}
              </FormField>
              <FormField>
                {previewSoundLoading && (<ActivityIndicator size="large" color="#FFFFFF" />)}
                {previewSoundResponse && previewSoundResponse.previewSound && (
                  <React.Fragment>
                    <FormFieldLabel>Preview</FormFieldLabel>
                    <SoundItem sound={previewSoundResponse.previewSound} disableCache disableFavorite />
                  </React.Fragment>
                )}
              </FormField>
              <ButtonContainer>
                <Button onPress={handleSubmit}>
                  <ButtonText>Preview</ButtonText>
                </Button>
                <Button onPress={handleSubmit}>
                  <ButtonText>Guardar</ButtonText>
                </Button>
              </ButtonContainer>
            </FormContainer>
          )}
        </Formik>
      </SafeArea>
    </Container>
  )
}

export default CreateSoundPage;
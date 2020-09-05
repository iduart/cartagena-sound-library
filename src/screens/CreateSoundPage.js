import React from 'react';
import { ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import SoundItem from '../components/SoundItem';
import getDuration from '../utils/getDuration';
import {
  TextInput,
  FormField,
  FormFieldLabel,
  ErrorText,
  Button,
  ButtonText
} from '../components/Forms';
import TimerInput from '../components/TimerInput';

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

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const CREATE_SOUND = gql`
  mutation createSound($input: createSoundInput!) {
    createSound(input: $input) {
      _id
      name
      author
      sound
      thumbnail
    }
  }
`;

const CreateSoundPage = (props) => {
  const [createSound, { data: createSoundResponse, loading: createSoundLoading }] = useMutation(CREATE_SOUND, {
    refetchQueries: ['getSounds'],
  });

  const submit = async (values, { resetForm }) => {
    if (createSoundLoading) {
      return;
    }

    const { url, from, to, name, author, isPreview } = values;
    await createSound({
      variables: {
        input: {
          url,
          from,
          to,
          name,
          author,
          deviceId: Constants.deviceId,
          isPreview,
        }
      }
    })

    if (!isPreview) {
      resetForm();
      props.navigation.navigate('explorar');
    }
  }

  const validate = (values) => {
    const errors = {};
    const REQUIRED = 'Requerido';

    const duration = getDuration(values.from, values.to);

    if (!values.url) {
      errors.url = REQUIRED;
    }
    if (!values.name) {
      errors.name = REQUIRED;
    }
    if (!values.author) {
      errors.author = REQUIRED;
    }
    if (!values.from) {
      errors.from = REQUIRED;
    }
    if (!values.to) {
      errors.to = REQUIRED;
    }
    if (!duration || duration > 7) {
      errors.to = 'Debe durar máximo 7 segundos';
    }
    if (duration <= 0) {
      errors.from = 'El "desde" debe ser menor que el "hasta"'
    }

    return errors;
  }

  return (
    <Container>
      <SafeArea>
        <Title>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrowleft" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TitleText>AGREGAR SONIDO</TitleText>
          <Icon name="arrowleft" size={40} color="transparent" />
        </Title>
        <ScrollView>
          <Formik
            initialValues={{
              url: '',
              from: '00:00:00.00',
              to: '00:00:07.00',
              name: '',
              author: '',
              isPreview: true,
            }}
            onSubmit={submit}
            validate={validate}
          >
            {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => (
              <FormContainer>
                <FormField>
                  <FormFieldLabel>Link de YouTube:</FormFieldLabel>
                  <TextInput
                    placeholder="Ej. https://www.youtube.com/watch?v=B2jvVuNaQ5g"
                    onChangeText={handleChange('url')}
                    value={values.url}
                  />
                  {errors.url && touched.url ? (
                    <ErrorText>{errors.url}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Desde:</FormFieldLabel>
                  <TimerInput
                    onChange={value => setFieldValue('from', value)}
                    value={values.from}
                  />
                  {errors.from && touched.from ? (
                    <ErrorText>{errors.from}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Hasta:</FormFieldLabel>
                  <TimerInput
                    onChange={value => setFieldValue('to', value)}
                    value={values.to}
                  />
                  {errors.to && touched.to ? (
                    <ErrorText>{errors.to}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Nombre del Audio:</FormFieldLabel>
                  <TextInput
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
                  <TextInput
                    placeholder="Ej. Moe - Los Simpsons"
                    onChangeText={handleChange('author')}
                    value={values.author}
                  />
                  {errors.author && touched.author ? (
                    <ErrorText>{errors.author}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  {createSoundLoading && (<ActivityIndicator size="large" color="#FFFFFF" />)}
                  {createSoundResponse && createSoundResponse.createSound && (
                    <React.Fragment>
                      <FormFieldLabel>Preview</FormFieldLabel>
                      <SoundItem sound={createSoundResponse.createSound} disableCache disableFavorite />
                    </React.Fragment>
                  )}
                </FormField>
                <ButtonContainer>
                  <Button
                    onPress={() => {
                      setFieldValue('isPreview', true);
                      handleSubmit();
                    }}
                    disabled={createSoundLoading}
                  >
                    <ButtonText>Preview</ButtonText>
                  </Button>
                  <Button
                    onPress={() => {
                      setFieldValue('isPreview', false);
                      handleSubmit();
                    }}
                    disabled={createSoundLoading}
                  >
                    <ButtonText>Guardar</ButtonText>
                  </Button>
                </ButtonContainer>
              </FormContainer>
            )}
          </Formik>
        </ScrollView>
      </SafeArea>
    </Container>
  )
}

export default CreateSoundPage;
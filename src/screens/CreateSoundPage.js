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
  flex: 1;
`;

const Title = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;
  padding-horizontal: 20px;
`;

const TitleText = styled.Text`
  margin-left: 10px;
  font-size: 30px;
  color: #FFFFFF;
  font-weight: bold;
`;

const FormContainer = styled.View`
  padding-horizontal: 30px;
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
  const [isSaveButtonAcitve, activateSaveButton] = React.useState(false);
  const [soundPreviewData, setSoundPreviewData] = React.useState();

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

    if (isPreview) {
      activateSaveButton(true);
    } else {
      resetForm();
      setSoundPreviewData(null);
      props.navigation.navigate('explorar');
      activateSaveButton(false);
    }
  }

  const validate = (values) => {
    const errors = {};
    const REQUIRED = 'Requerido';
    const youtubeUrlRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;

    const duration = getDuration(values.from, values.to);

    if (!values.url) {
      errors.url = REQUIRED;
    }
    if (!youtubeUrlRegex.test(values.url)) {
      errors.url = 'Debe ser una link de youtube';
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

  React.useEffect(() => {
    setSoundPreviewData(createSoundResponse);
  }, [createSoundResponse])

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
                    onChange={value => {
                      setFieldValue('from', value);
                      activateSaveButton(false);
                    }}
                    value={values.from}
                  />
                  {errors.from && touched.from ? (
                    <ErrorText>{errors.from}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Hasta:</FormFieldLabel>
                  <TimerInput
                    onChange={value => {
                      setFieldValue('to', value);
                      activateSaveButton(false);
                    }}
                    value={values.to}
                  />
                  {errors.to && touched.to ? (
                    <ErrorText>{errors.to}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  <FormFieldLabel>Nombre del Audio:</FormFieldLabel>
                  <TextInput
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
                    onChangeText={handleChange('author')}
                    value={values.author}
                  />
                  {errors.author && touched.author ? (
                    <ErrorText>{errors.author}</ErrorText>
                  ) : null}
                </FormField>
                <FormField>
                  {createSoundLoading && (<ActivityIndicator size="large" color="#FFFFFF" />)}
                  {soundPreviewData && soundPreviewData.createSound && (
                    <React.Fragment>
                      <FormFieldLabel>Preview</FormFieldLabel>
                      <SoundItem sound={soundPreviewData.createSound} disableCache disableFavorite />
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
                    disabled={createSoundLoading || !isSaveButtonAcitve}
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
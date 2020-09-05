import styled from 'styled-components/native';

const TextInput = styled.TextInput.attrs({
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

const FormField = styled.View`
  margin-bottom: 25px;
`;

const FormFieldLabel = styled.Text`
  font-size: 18px;
  color: #FFFFFF;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  color: red;
  padding: 5px 0 0 5px;
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
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 25px
`;

export {
  TextInput,
  FormField,
  FormFieldLabel,
  ErrorText,
  Button,
  ButtonText
};
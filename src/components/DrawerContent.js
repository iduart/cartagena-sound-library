import React from 'react';
import { TouchableOpacity, Alert, Linking } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const Container = styled(DrawerContentScrollView)`
  padding-top: 40px;
`;

const Button = styled.View`
  background-color: #232323;
  width: 75%;
  height: 50px;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  border-radius: 30px;  
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const Menu = styled.View`
  margin-top: 60px;
  width: 70%;
  padding-left: 10px;
`;

const MenuItem = styled.View`
  width: 100%;
  padding: 25px;
  border-bottom-color: ${props => props.isLast ? 'transparent' : 'rgba(255,255,255,0.4)'};
  border-bottom-width: ${props => props.isLast ? '0' : '2px'};
`;

const MenuItemTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const MenuItemIcon = styled(Icon)`
  margin-right: 15px;
`;

const MenuItemText = styled.Text`
  font-size: 25px;
  color: #FFFFFF;
`;

const FooterContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Logout = styled.TouchableOpacity`
  padding: 15px;
  border-top-color: rgba(255,255,255,0.4);
  border-top-width: 2px;
  width: 50%;
  align-items: center;
`;

const LogoutText = styled.Text`
  color: #FFFFFF;
  font-size: 25px;
`;

const DrawerContent = (props) => {
  const authenticated = false;

  const showCreateSoundAlert = () => {
    Alert.alert(
      "Todavia no he terminado esta parte...",
      "Pero puedes enviarme un email con el sonido que quieres agregar y yo lo agrego enseguida!",
      [
        {
          text: "Mejor no! 😒",
        },
        { text: "Enviar correo 👍", onPress: async () =>  await Linking.openURL('mailto:cartagenasoundlibrary@gmail.com?subject=Quiero un sonido') }
      ],
    );
  }

  return (
    <Container {...props}>
      <TouchableOpacity onPress={showCreateSoundAlert}>
        <Button>
          <Icon name="clouduploado" size={30} color="#FFFFFF" />
          <ButtonText>AGREGAR SONIDO</ButtonText>
        </Button>
      </TouchableOpacity>
      {!authenticated && (
        <Menu>
          <MenuItem>
            <MenuItemTouchable onPress={() => alert('comming soon...')}>
              <MenuItemIcon name="login" size={25} color="#FFFFFF" />
              <MenuItemText>Entrar</MenuItemText>
            </MenuItemTouchable>
          </MenuItem>
          <MenuItem isLast={true}>
            <MenuItemTouchable onPress={() => alert('comming soon...')}>
              <MenuItemIcon name="form" size={25} color="#FFFFFF" />
              <MenuItemText>Registrarse</MenuItemText>
            </MenuItemTouchable>
          </MenuItem>
        </Menu>
      )}
      {authenticated && (
        <Menu>
          <MenuItem>
            <MenuItemTouchable>
              <MenuItemIcon name="profile" size={25} color="#FFFFFF" />
              <MenuItemText>Perfil</MenuItemText>
            </MenuItemTouchable>
          </MenuItem>
          <MenuItem>
            <MenuItemTouchable>
              <MenuItemIcon name="sound" size={25} color="#FFFFFF" />
              <MenuItemText>Mis Sonidos</MenuItemText>
            </MenuItemTouchable>
          </MenuItem>
          <MenuItem isLast={true}>
            <MenuItemTouchable>
              <MenuItemIcon name="hearto" size={25} color="#FFFFFF" />
              <MenuItemText>Mis favoritos</MenuItemText>
            </MenuItemTouchable>
          </MenuItem>
        </Menu>
      )}
      {authenticated && (
        <FooterContainer>
          <Logout>
            <LogoutText>Salir</LogoutText>
          </Logout>
        </FooterContainer>
      )}
    </Container>
  );
}
export default DrawerContent;
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import MainScreenHeader from '../components/MainScreenHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchBar from '../components/SearchBar';
import SoundList from '../components/SoundList';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(LinearGradient).attrs({
  colors: ['#FFE17E', '#F37578']
})`
  padding-horizontal: 10px;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const TabContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;

const Tabs = styled(Tab.Navigator).attrs({
  tabBarOptions: {
    labelStyle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    indicatorStyle: {
      backgroundColor: '#FF7F00',
    },
    style: {
      backgroundColor: 'transparent',
    },
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderTopWidth: 2,
    marginTop: -2,
  },
})``;

const Home = () => {
  return (
    <Container>
      <SafeArea>
        <MainScreenHeader />
        <SearchBar />
        <TabContainer>
          <Tabs>
            <Tab.Screen name="favoritos" component={SoundList} />
            <Tab.Screen name="explorar" component={SoundList} />
          </Tabs>
        </TabContainer>
      </SafeArea>
    </Container>
  )
}

export default Home;
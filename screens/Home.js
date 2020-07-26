import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SoundItem from '../components/SoundItem';
import MainScreenHeader from '../components/MainScreenHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchBar from '../components/SearchBar';
import data from './data';

const Container = styled(LinearGradient).attrs({
  colors: ['#FFE17E', '#F37578']
})`
  padding-horizontal: 10px;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const TabContainer = styled.View`
  margin-top: 20px;
  height: 500px;
`;

const Tabs = styled(Tab.Navigator).attrs({
  tabBarOptions: {
    labelStyle: {
      color: '#FFFFFF',
      fontSize: 16
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
    marginTop: -2
  },
})``;

const Home = ({ navigation }) => {

  const handleNamePress = (item) => () => {
    navigation.navigate('soundDetail', item);
  }

  return (
    <Container>
      <MainScreenHeader />
      <SearchBar />
      <TabContainer>
        <Tabs>
          <Tab.Screen name="favoritos" component={() => (<SafeAreaView />)} />
          <Tab.Screen name="explorar" component={() => (<SafeAreaView />)} />
        </Tabs>
      </TabContainer>
      <FlatList
        data={data}
        // renderItem={
        //   ({ item }) => <SoundItem sound={item} handleNamePress={handleNamePress(item)} />
        // }
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}

export default Home;
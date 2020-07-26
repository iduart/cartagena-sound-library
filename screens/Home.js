import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import SoundItem from '../components/SoundItem';
import MainScreenHeader from '../components/MainScreenHeader';
import Logo from '../components/Logo';
import data from './data';

const Container = styled(SafeAreaView)`
  background-color: #FFE1A6;
  flex: 1;
`;

const Home = ({ navigation }) => {

  const handleNamePress = (item) => () => {
    navigation.navigate('soundDetail', item);
  }

  return (
    <Container>
      <MainScreenHeader />
      {/* <FlatList
        data={data}
        renderItem={
          ({ item }) => <SoundItem sound={item} handleNamePress={handleNamePress(item)} />
        }
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={MainScreenHeader}
      /> */}
    </Container>
  )
}

export default Home;
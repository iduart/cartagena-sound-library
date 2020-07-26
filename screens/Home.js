import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SoundItem from '../components/SoundItem';
import MainScreenHeader from '../components/MainScreenHeader';
import SearchBar from '../components/SearchBar';
import data from './data';

const Container = styled(LinearGradient).attrs({
  colors: ['#FFE17E','#F37578']
})`
  flex: 1;
`;

const Home = ({ navigation }) => {

  const handleNamePress = (item) => () => {
    navigation.navigate('soundDetail', item);
  }

  return (
    <Container>
      <MainScreenHeader />
      <SearchBar />
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
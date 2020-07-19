import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import SoundItem from '../components/SoundItem';
import LogoHeader from '../components/LogoHeader';
import data from './data';

const Container = styled(SafeAreaView)`
  background-color: #FFFFFF;
`;

const Home = ({ navigation }) => {
  const handleNamePress = (item) => () => {
    navigation.navigate('soundDetail', item);
  }

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => <SoundItem picture={item.thumbnail} name={item.text} onNamePress={handleNamePress(item)} />
        }
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={LogoHeader}
      />
    </Container>
  )
}

export default Home;
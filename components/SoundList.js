import React from 'react';
import styled from 'styled-components/native';
import SoundItem from './SoundItem';
import data from '../screens/data';

const List = styled.FlatList`
  padding-top: 30px;
`;

const SoundList = () => {  
  return (
    <List
      data={data}
      renderItem={
        ({ item }) => <SoundItem sound={item} />
      }
      keyExtractor={item => item.code}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default SoundList;
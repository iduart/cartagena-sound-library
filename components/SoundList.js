import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SoundItem from './SoundItem';

const GET_SOUNDS = gql`
  query getSounds {
    sounds {
      _id
      name
      sound
      thumbnail
      author
      tags
    }
  }
`;

const List = styled.FlatList`
  padding-top: 30px;
`;

const SoundList = () => {
  const { loading, error, data } = useQuery(GET_SOUNDS);

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error {JSON.stringify(error)}</Text>;

  return (
    <List
      data={data.sounds || []}
      renderItem={
        ({ item }) => <SoundItem key={item._id} sound={item} />
      }
      keyExtractor={item => item.code}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default SoundList;
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SoundItem from './SoundItem';

const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingTop: 30 }
})``;

const ActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

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

const SoundList = () => {
  const { loading, error, data } = useQuery(GET_SOUNDS);

  if (loading) return <ActivityIndicator color="#FFFFFF" size="large" />;
  if (error) return <Text>Error {JSON.stringify(error)}</Text>;

  return (
    <List
      data={data.sounds || []}
      renderItem={
        ({ item }) => <SoundItem key={item._id} sound={item} />
      }
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default SoundList;
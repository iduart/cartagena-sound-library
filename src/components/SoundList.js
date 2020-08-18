import React from 'react';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import SoundItem from './SoundItem';

const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingTop: 20 }
})``;

const ActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

const GET_FAVORITES_SOUNDS_IDS = gql`
  query deviceFavoritesSoundsIds($deviceId: String!) {
    deviceFavoritesSoundsIds(deviceId: $deviceId) 
  }
`;

const SoundList = ({
  sounds = [],
  onFetchMore = () => {},
  hasMoreResults,
  loading
 }) => {
  const { data: favoritesResults = { deviceFavoritesSoundsIds: [] } } = useQuery(GET_FAVORITES_SOUNDS_IDS, {
    variables: {
      deviceId: Constants.deviceId
    }
  });

  const isFavorite = soundId => favoritesResults.deviceFavoritesSoundsIds.indexOf(soundId) > -1;

  return (
    <List
      data={sounds}
      renderItem={
        ({ item }) => <SoundItem key={item._id} sound={item} isFavorite={isFavorite(item._id)} />
      }
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={onFetchMore}
      ListFooterComponent={
        () => hasMoreResults && loading ? <ActivityIndicator color="#FFFFFF" size="large" /> : null
      }
    />
  )
}

export default SoundList;
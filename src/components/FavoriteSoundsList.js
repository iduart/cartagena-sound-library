import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import SoundList from './SoundList';
import { globalSearchSelectors } from '../store/globalSearch';

const GET_FAVORITES_SOUNDS = gql`
  query deviceFavoriteSounds($deviceId: String!) {
    deviceFavoritesSounds(deviceId: $deviceId) {
      _id
      name
      sound
      thumbnail
      author
      tags
    }  
  }
`;

const FavoriteSoundList = () => {
  const searchText = useSelector(globalSearchSelectors.getSearchText);
  const { loading, error, data = {} } = useQuery(GET_FAVORITES_SOUNDS, {
    variables: {
      deviceId: Constants.deviceId,
      filters: {
        search: searchText,
      },
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <Text>Error {JSON.stringify(error)}</Text>;

  return (
    <SoundList
      sounds={data.deviceFavoritesSounds}
      onFetchMore={() => {}}
      hasMoreResults={false}
      loading={loading}
    />
  )
}

export default FavoriteSoundList;
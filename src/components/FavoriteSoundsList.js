import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import SoundList from './SoundList';
import { globalSearchSelectors } from '../store/globalSearch';

const EmptyState = styled.Text`
  margin-top: 30px;
  text-align: center;
`;

const GET_FAVORITES_SOUNDS = gql`
  query deviceFavoriteSounds($deviceId: String!, $offset: Int!) {
    deviceFavoritesSounds(deviceId: $deviceId, offset: $offset) {
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
  const [hasMoreResults, setHasMoreResults] = React.useState(true);
  const { loading, error, data = {}, fetchMore } = useQuery(GET_FAVORITES_SOUNDS, {
    variables: {
      deviceId: Constants.deviceId,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMore = React.useCallback(() => {   
    if (loading) return;
     
    fetchMore({
      variables: {
        offset: data.deviceFavoritesSounds.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult && !fetchMoreResult.deviceFavoritesSounds.length) {
          setHasMoreResults(false);
        }

        return Object.assign({}, prev, {
          deviceFavoritesSounds: [...prev.deviceFavoritesSounds, ...fetchMoreResult.deviceFavoritesSounds]
        });
      }
    })
  }, [data.deviceFavoritesSounds, loading]);

  if (error) return <Text>Error {JSON.stringify(error)}</Text>;

  if (!data.deviceFavoritesSounds || !data.deviceFavoritesSounds.length) {
    return <EmptyState>Aún no has agregado favoritos</EmptyState>
  }

  return (
    <SoundList
      sounds={data.deviceFavoritesSounds}
      onFetchMore={handleFetchMore}
      hasMoreResults={hasMoreResults}
      loading={loading}
    />
  )
}

export default FavoriteSoundList;
import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import SoundList from './SoundList';

const EmptyState = styled.View`
  margin-top: 30px;
`;

const EmptyStateText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: #FFFFFF;
`;

const EmptyStateIcon = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const EmptyStateLink = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 10px;
  text-decorationLine: underline;
  text-decorationStyle: solid;
  text-decorationColor: #FFFFFF;
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

const FavoriteSoundList = ({ navigation }) => {
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
    return (
      <EmptyState>
        <EmptyStateText>Aún no has agregado favoritos</EmptyStateText>
        <TouchableOpacity onPress={() => navigation.navigate('explorar')}>
          <EmptyStateLink>Explorar sonidos</EmptyStateLink>
        </TouchableOpacity>
        <EmptyStateIcon>
          <Icon name="heart" color="#FFFFFF" size={80} />
        </EmptyStateIcon>
      </EmptyState>
    )
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
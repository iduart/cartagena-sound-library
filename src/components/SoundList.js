import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SoundItem from './SoundItem';
import { globalSearchSelectors } from '../store/globalSearch';

const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingTop: 20 }
})``;

const ActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

const GET_SOUNDS = gql`
  query getSounds($filters: filtersInput, $offset: Int!) {
    sounds(filters: $filters, offset: $offset) {
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
  const [hasMoreResults, setHasMoreResults] = React.useState(true);
  const searchText = useSelector(globalSearchSelectors.getSearchText);
  const { loading, error, data = {}, fetchMore } = useQuery(GET_SOUNDS, {
    variables: {
      filters: {
        search: searchText,
      },
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMore = React.useCallback(() => {   
    if (loading) return;
     
    fetchMore({
      variables: {
        offset: data.sounds.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult && !fetchMoreResult.sounds.length) {
          setHasMoreResults(false);
        }

        return Object.assign({}, prev, {
          sounds: [...prev.sounds, ...fetchMoreResult.sounds]
        });
      }
    })
  }, [data.sounds, loading]);

  if (error) return <Text>Error {JSON.stringify(error)}</Text>;

  return (
    <List
      data={data.sounds || []}
      renderItem={
        ({ item }) => <SoundItem key={item._id} sound={item} />
      }
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={handleFetchMore}
      ListFooterComponent={
        () => hasMoreResults && loading ? <ActivityIndicator color="#FFFFFF" size="large" /> : null
      }
    />
  )
}

export default SoundList;
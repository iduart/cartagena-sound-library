import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SoundList from './SoundList';
import { globalSearchSelectors } from '../store/globalSearch';

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

const ExploreSoundList = () => {
  const searchText = useSelector(globalSearchSelectors.getSearchText);
  const [hasMoreResults, setHasMoreResults] = React.useState(true);
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
    <SoundList
     sounds={data.sounds}
     onFetchMore={handleFetchMore}
     hasMoreResults={hasMoreResults}
     loading={loading}
    />
  )
}

export default ExploreSoundList;
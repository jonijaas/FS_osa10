import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client'
import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, { variables: { id } });

  if (loading) {
    return (<Text>Repository loading...</Text>);
  }
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const repository = data.repository;

  const reviews = data.repository
    ? data.repository.reviews.edges.map((r) => r.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem repository={repository} single='true' />
          <ItemSeparator />
        </>
      )}
    />
  );
}

export default SingleRepository;
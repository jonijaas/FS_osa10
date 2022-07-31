import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useSingleRepository from '../hooks/useSingleRepository';
import ReviewItem from './ReviewItem'
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  
  const { repository, fetchMore, loading } = useSingleRepository({
    id,
    first: 5
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = repository
    ? repository.reviews.edges.map((r) => r.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={(
        <>
          <RepositoryItem repository={repository} single='true' />
          <ItemSeparator />
        </>
      )}
    />
  );
}

export default SingleRepository;
import { FlatList, View, StyleSheet } from "react-native";

import ReviewItem from "./ReviewItem";
import useCurUser from '../hooks/useCurUser';
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { currentUser, loading, refetch } = useCurUser({ includeReviews: true });
  
  if (loading) {
    return <Text>Loading reviews...</Text>;
  }

  const reviews = currentUser
    ? currentUser.reviews.edges.map((r) => r.node)
    : [];
  
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} myReviews={true} refetch={refetch} />}
      keyExtractor={item => item.id}
    />
  )
}

export default MyReviews;
import { View, StyleSheet } from "react-native";
import { format } from 'date-fns';

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingText: {
    color: theme.colors.primary
  },
  reviewTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 15,
    flex: 1
  }
});

const ReviewItem = ({ review }) => {
  const formatDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text fontWeight='bold' style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary'>{formatDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
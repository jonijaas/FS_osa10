import { View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import Text from "./Text";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 15,
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  reviewInfo: {
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
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10
  },
  buttonText: {
    color: theme.colors.appBarText,
    alignSelf: 'center',
    padding: 5,
  }
});

const ReviewItem = ({ review, myReviews, refetch }) => {
  const formatDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const [deleteReview] = useDeleteReview();
  let navigate = useNavigate();

  const onViewPress = ({ review }) => {
    navigate(`/${review.repository.id}`, { replace: true });
  };

  const onDeletePress = ({ review }) => {
    const id = review.id;
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel'
        },
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReview({ id });
            refetch();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInfo}>
        <View style={styles.ratingCircle}>
          <Text fontWeight='bold' style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text fontWeight='bold'>{myReviews ? review.repository.fullName : review.user.username}</Text>
          <Text color='textSecondary'>{formatDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {myReviews && 
        <View style={styles.buttonContainer}>
          <Pressable style={styles.viewButton} onPress={() => onViewPress({ review })}>
            <Text style={styles.buttonText} fontWeight='bold'>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={() => onDeletePress({ review })}>
            <Text style={styles.buttonText} fontWeight='bold'>Delete review</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default ReviewItem;
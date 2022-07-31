import { Pressable, StyleSheet, View } from 'react-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  pressableBox: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    margin: 10
  },
  pressableBoxText: {
    color: theme.colors.appBarText,
    alignSelf: 'center',
    padding: 5,
  }
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100'  />
      <FormikTextInput name='text' placeholder='Review' multiline={true} />
      <Pressable style={styles.pressableBox} onPress={onSubmit}>
        <Text style={styles.pressableBoxText} fontWeight='bold'>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Pressable style={styles.pressableBox} onPress={onSubmit}>
        <Text style={styles.pressableBoxText} fontWeight='bold'>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import SignInForm from './SignInForm';
import theme from '../theme';

const styles = StyleSheet.create({
  signContainer: {
    margin: 0,
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    display: 'flex'
  },
});

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.signContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
};

export default SignIn;
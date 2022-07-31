import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn'
import SignUpForm from './SignUpForm';
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
  password: '',
  passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!')
    .min(1, 'Username minimum length is 1 character!')
    .max(30, 'Username maximum length is 30 characters!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(5, 'Password minimum length is 5 characters!')
    .max(50, 'Password maximum length is 50 characters!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation does not match with password!')
    .required('Password confirmation is required!')
});

export const SignUpContainer = ({ onSubmit }) => (
  <View style={styles.signContainer}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  </View>
);

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      if (data) {
        await signIn({ username, password })
        navigate('/', { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignUpContainer onSubmit={onSubmit} />);
};

export default SignUp;
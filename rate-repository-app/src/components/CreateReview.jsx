import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import ReviewForm from './ReviewForm';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  signContainer: {
    margin: 0,
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    display: 'flex'
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required!'),
  repositoryName: yup
    .string()
    .required('Repository name is required!'),
  rating: yup
    .number()
    .typeError('Rating must be integer!')
    .integer('Rating must be integer!')
    .required('Rating is required!')
    .min(0, 'Rating minimum value is 0!')
    .max(100, 'Rating maximum value is 100!'),
});

const CreateReview = () => {
  let navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const rating = parseInt(values.rating);
    const { ownerName, repositoryName, text } = values;
    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text})
      if (data)
        navigate(`/${data.createReview.repositoryId}`, { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <View style={styles.signContainer}>
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  </View>
  )
};

export default CreateReview;
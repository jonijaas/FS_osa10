import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { data, loading, ...result } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    currentUser: data?.me,
    loading,
    ...result,
  };
};

export default useSingleRepository;

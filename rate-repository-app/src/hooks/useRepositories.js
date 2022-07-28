import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const fetchRepositories = data ? data.repositories : [];
    if (error) {
      throw new Error(error.message);
    }
    setRepositories(fetchRepositories);
  }, [data]);

  return { repositories, loading };
};

export default useRepositories;

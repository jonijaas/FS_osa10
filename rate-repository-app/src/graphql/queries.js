import { gql } from '@apollo/client';

import { REPOSITORY_ITEM } from './fragment';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryItem
        }
      }
    }
  }
  ${REPOSITORY_ITEM}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

import { gql } from '@apollo/client';

import { REPOSITORY_ITEM, REPOSITORY_REVIEW } from './fragment';

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

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      reviews {
        edges {
          node {
            user {
              id
              username
            }
            ...repositoryReview
          }
        }
      }

      ...RepositoryItem
    }
  }
  ${REPOSITORY_ITEM}
  ${REPOSITORY_REVIEW}
`;

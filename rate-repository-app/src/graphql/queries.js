import { gql } from '@apollo/client';

import { REPOSITORY_ITEM, REPOSITORY_REVIEW } from './fragment';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryItem
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      reviews(first: $first, after: $after) {
        edges {
          node {
            user {
              id
              username
            }
            ...repositoryReview
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }

      ...RepositoryItem
    }
  }
  ${REPOSITORY_ITEM}
  ${REPOSITORY_REVIEW}
`;

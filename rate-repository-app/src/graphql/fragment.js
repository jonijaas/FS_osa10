import { gql } from '@apollo/client';

export const REPOSITORY_ITEM = gql`
  fragment RepositoryItem on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

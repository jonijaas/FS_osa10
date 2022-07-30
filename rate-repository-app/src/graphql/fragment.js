import { gql } from '@apollo/client';

export const REPOSITORY_ITEM = gql`
  fragment RepositoryItem on Repository {
    id
    name
    ownerName
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
  }
`;

export const REPOSITORY_REVIEW = gql`
  fragment repositoryReview on Review {
    id
    text
    rating
    createdAt
  }
`;

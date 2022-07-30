import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(repositoryItems).toHaveLength(2);

      //fullName
      expect(
        within(firstRepositoryItem).getByTestId('fullName')
      ).toHaveTextContent('jaredpalmer/formik');
      expect(
        within(secondRepositoryItem).getByTestId('fullName')
      ).toHaveTextContent('async-library/react-async');

      //description
      expect(
        within(firstRepositoryItem).getByTestId('description')
      ).toHaveTextContent('Build forms in React, without the tears');
      expect(
        within(secondRepositoryItem).getByTestId('description')
      ).toHaveTextContent('Flexible promise-based React data loader');

      //language
      expect(
        within(firstRepositoryItem).getByTestId('language')
      ).toHaveTextContent('TypeScript');
      expect(
        within(secondRepositoryItem).getByTestId('language')
      ).toHaveTextContent('JavaScript');

      //forks
      expect(
        within(firstRepositoryItem).getByTestId('forks')
      ).toHaveTextContent('1.6k');
      expect(
        within(secondRepositoryItem).getByTestId('forks')
      ).toHaveTextContent('69');

      //stargazers
      expect(
        within(firstRepositoryItem).getByTestId('stars')
      ).toHaveTextContent('21.9k');
      expect(
        within(secondRepositoryItem).getByTestId('stars')
      ).toHaveTextContent('1.8k');

      //ratings
      expect(
        within(firstRepositoryItem).getByTestId('ratings')
      ).toHaveTextContent('88');
      expect(
        within(secondRepositoryItem).getByTestId('ratings')
      ).toHaveTextContent('72');

      //reviews
      expect(
        within(firstRepositoryItem).getByTestId('reviews')
      ).toHaveTextContent('3');
      expect(
        within(secondRepositoryItem).getByTestId('reviews')
      ).toHaveTextContent('3');
    });
  });
});

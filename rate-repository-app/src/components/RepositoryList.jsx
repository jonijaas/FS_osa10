import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortPicker: {
    height: 60,
    margin: 20,
    marginTop: 0,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.mainBackground,
    borderWidth: 0
  },
  searchBar: {
    margin: 20
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ selectedSort, setSelectedSort }) => {
  return (
    <Picker
      selectedValue={selectedSort}
      style={styles.sortPicker}
      onValueChange={(itemValue) => 
        setSelectedSort(itemValue)
      }
      prompt={'Select an item...'}
    >
      <Picker.Item label='Latest repositories' value='latest' />
      <Picker.Item label='Highest rated repositories' value='highRated' />
      <Picker.Item label='Lowest rated repositories' value='lowRated' />
    </Picker>
  )
}

const Filter = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);
  
  return (
    <Searchbar
      placeholder='Search...'
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchBar}
    />
  )
}

export const RepositoryListContainer = ({ repositories, onEndReach, onPress , selectedSort, setSelectedSort, searchQuery, setSearchQuery }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (<Pressable onPress={() => onPress({item})} ><RepositoryItem repository={item} single={false} /></Pressable>)}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View>
          <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <SortPicker selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearch] = useDebounce(searchQuery, 500);

  let variables = { ...variables, searchKeyword: debounceSearch };
  
  switch (selectedSort) {
    case 'highRated':
      variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'lowRated':
      variables = { ...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      variables = { ...variables, orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
  }
  const { repositories, fetchMore } = useRepositories({
    ...variables,
    first: 8
  });

  const onEndReach = () => {
    fetchMore();
  }

  let navigate = useNavigate();
  const onPress = ({ item }) => {
    navigate(`/${item.id}`, { replace: true });
  }
  
  return <RepositoryListContainer
    repositories={repositories}
    onEndReach={onEndReach}
    onPress={onPress}
    selectedSort={selectedSort}
    setSelectedSort={setSelectedSort}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery} />;
};

export default RepositoryList;
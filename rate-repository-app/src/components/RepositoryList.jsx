import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPress }) => {
  const repositoryNodes = repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (<Pressable onPress={() => onPress({item})} ><RepositoryItem repository={item} single={false} /></Pressable>)}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  let navigate = useNavigate();
  const onPress = ({ item }) => {
    navigate(`/${item.id}`, { replace: true });
  }
  
  return <RepositoryListContainer repositories={repositories} onPress={onPress} />;
};

export default RepositoryList;
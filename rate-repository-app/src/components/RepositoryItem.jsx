import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from 'expo-linking';

import RepositoryItemCounts from "./RepositoryItemCounts";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  repositoryItemContainer: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textContainer: {
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.languageText,
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  countsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  pressableBox: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    marginTop: 10
  },
  pressableBoxText: {
    color: theme.colors.appBarText,
    alignSelf: 'center',
    padding: 5,
  }
})


const RepositoryItem = ({ repository, single }) => {
  const openGitHub = () => {
    Linking.openURL(repository.url);
  }
  return (
    <View testID='repositoryItem' style={styles.repositoryItemContainer}>
      <View style={styles.upperContainer}>
        <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}} />
        <View style={styles.textContainer}>
          <Text testID='fullName' fontWeight='bold'>{repository.fullName}</Text>
          <Text testID='description' color='textSecondary'>{repository.description}</Text>
          <Text testID='language' style={styles.languageBox}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <RepositoryItemCounts testID='stars' name='Stars' count={repository.stargazersCount} />
        <RepositoryItemCounts testID='forks' name='Forks' count={repository.forksCount} />
        <RepositoryItemCounts testID='reviews' name='Reviews' count={repository.reviewCount} />
        <RepositoryItemCounts testID='ratings' name='Rating' count={repository.ratingAverage} />
      </View>
      {single && 
      <Pressable style={styles.pressableBox} onPress={openGitHub} >
        <Text style={styles.pressableBoxText} fontWeight='bold'>Open in GitHub</Text>
      </Pressable>
      }
    </View>
  )
}

export default RepositoryItem;
import { View, Image, StyleSheet } from "react-native";
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
  }
})


const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.repositoryItemContainer}>
      <View style={styles.upperContainer}>
        <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}} />
        <View style={styles.textContainer}>
          <Text fontWeight='bold'>{repository.fullName}</Text>
          <Text color='textSecondary'>{repository.description}</Text>
          <Text style={styles.languageBox}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <RepositoryItemCounts name='Stars' count={repository.stargazersCount} />
        <RepositoryItemCounts name='Forks' count={repository.forksCount} />
        <RepositoryItemCounts name='Reviews' count={repository.reviewCount} />
        <RepositoryItemCounts name='Rating' count={repository.ratingAverage} />
      </View>
    </View>
  )
}

export default RepositoryItem;
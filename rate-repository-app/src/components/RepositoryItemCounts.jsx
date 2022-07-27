import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  countContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const RepositoryItemCounts = ({ name, count }) => {
  const formatCount = ( value ) => {
    if (value >= 1000) {
      return (Math.round(value / 100) / 10) + 'k';
    }
    return value;
  }
  
  return (
    <View style={styles.countContainer}>
      <Text fontWeight='bold'>{formatCount(count)}</Text>
      <Text color='textSecondary'>{name}</Text>
    </View>
  )
};

export default RepositoryItemCounts;
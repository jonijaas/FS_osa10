import { StyleSheet, Pressable } from "react-native";
import { Link } from 'react-router-native';

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  appBarText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    margin: 5
  }
})

const AppBarTab = ({ text, link, onClick }) => {
  return (
    <Pressable>
      <Link to={link} onPress={onClick}>
        <Text style={styles.appBarText}>{text}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab;
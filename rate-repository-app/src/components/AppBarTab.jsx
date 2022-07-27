import { StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  appBarText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold
  }
})

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.appBarText}>{text}</Text>
    </Pressable>
  )
}

export default AppBarTab;
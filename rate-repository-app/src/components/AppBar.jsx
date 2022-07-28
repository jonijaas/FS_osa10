import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';

import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    padding: 10,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text='Repositories' link='/' />
        <AppBarTab text='Sign in' link='/signin' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
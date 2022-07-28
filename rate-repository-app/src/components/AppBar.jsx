import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from "@apollo/client";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { ME } from '../graphql/queries';
import useAuthStorage from "../hooks/useAuthStorage";

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });

  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text='Repositories' link='/' />
        {data.me ? <AppBarTab text='Sign out' link='/signin' onClick={() => signOut()} /> : <AppBarTab text='Sign in' link='/signin' />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
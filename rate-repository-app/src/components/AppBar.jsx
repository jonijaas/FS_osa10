import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import { useApolloClient } from "@apollo/client";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useCurUser from '../hooks/useCurUser';
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

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
  const { currentUser, loading } = useCurUser({ includeReviews: false });

  if (loading) {
    return <Text>Loading user...</Text>;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text='Repositories' link='/' />
        {currentUser
          ? (
            <>
              <AppBarTab text='Create a review' link='/createreview' />
              <AppBarTab text='My reviews' link='/myreviews' />
              <AppBarTab text='Sign out' link='/signin' onClick={() => signOut()} />
            </>
          )
          : (
            <>
              <AppBarTab text='Sign in' link='/signin' />
              <AppBarTab text='Sign up' link='/signup' />
            </>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
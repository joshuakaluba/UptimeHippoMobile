import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { AsyncStorageUtil } from '../utilities';

export default class AuthenticationLoadingScreen extends React.Component {

  constructor() {
    super();
    this._determineAuthentication();
  }

  _determineAuthentication = async () => {
    const userToken = await AsyncStorageUtil.getAccessToken();
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import { AppLoading,  } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from "./src/constants";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

  theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      accent: "yellow"
    }
  };
  
export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };
  
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
            <AppNavigator />
          </View>
        </PaperProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
});

import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { TabBarIcon } from "../components";
import { ApplicationDefaultSettings, StringDictionary } from "../constants";
import { RegisterScreen, LogInScreen } from "../screens";

const RegisterScreenStack = createStackNavigator({
  Links: RegisterScreen
});

RegisterScreenStack.navigationOptions = {
  tabBarLabel: StringDictionary.register,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
    />
  )
};

const LogInScreenStack = createStackNavigator({
  Links: LogInScreen
});

LogInScreenStack.navigationOptions = {
  tabBarLabel: StringDictionary.login,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

const AuthenticationNavigator = createBottomTabNavigator(
  {
    RegisterScreenStack,
    LogInScreenStack
  },
  {
    tabBarOptions: ApplicationDefaultSettings.tabBarOptions
  }
);

export default AuthenticationNavigator;

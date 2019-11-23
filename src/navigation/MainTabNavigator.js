import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { TabBarIcon } from "../components";
import { ApplicationDefaultSettings, StringDictionary } from "../constants";
import {
  HomeScreen,
  MonitorScreen,
  MonitorLogScreen,
  SettingsScreen
} from "../screens";

const HomeScreenStack = createStackNavigator({
  Home: HomeScreen,
  MonitorLogs: MonitorLogScreen
});

HomeScreenStack.navigationOptions = {
  tabBarLabel: StringDictionary.status,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-home"} />
};

const MonitorScreenStack = createStackNavigator({
  Monitors: MonitorScreen,
  MonitorLogs: MonitorLogScreen
});

MonitorScreenStack.navigationOptions = {
  tabBarLabel: StringDictionary.monitors,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list-box" : "md-list-box"}
    />
  )
};

const SettingsScreenStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsScreenStack.navigationOptions = {
  tabBarLabel: StringDictionary.settings,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cog" : "md-cog"}
    />
  )
};

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeScreenStack,
    MonitorScreenStack,
    SettingsScreenStack
  },
  {
    tabBarOptions: ApplicationDefaultSettings.tabBarOptions
  }
);

export default MainTabNavigator;

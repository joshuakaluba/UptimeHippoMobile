import Colors from "./Colors";
import { Platform } from "react-native";
import Constants from "expo-constants";

export default ApplicationDefaultSettings = {
  tabBarOptions: {
    activeTintColor: Colors.darkGrey,
    inactiveTintColor: Colors.lightGrey,
    style: {
      backgroundColor: Colors.tabBarBackgroundColor,
      paddingBottom:
        Platform.OS === "ios" && Constants.statusBarHeight < 40 ? 3 : 0,
      paddingTop:
        Platform.OS === "ios" && Constants.statusBarHeight > 40 ? 2 : 0,
      height: Platform.isPad
        ? 55
        : Platform.OS === "ios" && Constants.statusBarHeight > 40
        ? 46
        : Platform.OS === "android"
        ? 54
        : Platform.OS === "ios"
        ? 50
        : null,
      borderTopWidth: 3
    },
    iconStyle: {
      height: 30,
      width: 30,
      marginTop: Platform.OS === "android" ? -5 : 0
    },
    indicatorStyle: {
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontWeight: "bold"
    }
  },
  headerStyle: {
    backgroundColor: Colors.headerBackgroundColor
  },
  headerTintColor: Colors.headerTintColor,
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

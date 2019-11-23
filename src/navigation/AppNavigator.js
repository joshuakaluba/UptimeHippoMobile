import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthenticationLoadingScreen from "../screens/AuthenticationLoadingScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import MainTabNavigator from "./MainTabNavigator";

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthenticationLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthenticationNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(switchNavigator);

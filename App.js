import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/navigator/Navigator";
import AuthorizationScreen from "./src/screen/AuthorizationScreen";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { gStyle } from "./src/style/gStyle";
import RegistrationScreen from "./src/screen/RegistrationScreen";
import { HomeScreenNavigator } from "./src/navigator/HomeScreenNavigator";
import UserScreen from "./src/screen/UserScreen";
import ExplorerScreen from "./src/screen/ExplorerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "localstorage-polyfill";
import { TabBarNavigato } from "./src/navigator/TabBarNavigator";
import { MainNavigator } from "./src/navigator/MainNavigator";

export default function App() {
  return (
    <View style={gStyle.container}>
      <MainNavigator />
    </View>
  );
}

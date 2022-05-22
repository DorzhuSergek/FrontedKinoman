import * as React from "react";
import { View, Text } from "react-native";
import ExplorerScreen from "../screen/ExplorerScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { HomeScreenNavigator } from "./HomeScreenNavigator";
import UserScreen from "../screen/UserScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { gStyle } from "../style/gStyle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StartScreenNavigator } from "./StartScreenNavigator";
import "localstorage-polyfill";
import { NavigationContainer } from "@react-navigation/native";

export function Navigator({ route }) {
  const Stack = createStackNavigator();
  return (
    <View style={gStyle.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Authorization"
          component={StartScreenNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

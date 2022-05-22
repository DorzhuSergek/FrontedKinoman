import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthorizationScreen from "../screen/AuthorizationScreen";
import RegistrationScreen from "../screen/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TabBarNavigato } from "./TabBarNavigator";
import UserScreen from "../screen/UserScreen";

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerMode: "none",
};

export const StartScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthorizationScreen"
        component={AuthorizationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TabBarNavigato"
        component={TabBarNavigato}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

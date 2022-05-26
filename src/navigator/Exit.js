import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import UserScreen from "../screen/UserScreen";
import AuthorizationScreen from "../screen/AuthorizationScreen";
import { gStyle } from "../style/gStyle";

export const Exit = () => {
  const Stack = createStackNavigator();
  const screenOptionStyle = {
    headerMode: "none",
  };

  return (
    <View style={gStyle.container}>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="Exit" component={AuthorizationScreen} />
      </Stack.Navigator>
    </View>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import UserScreen from "../screen/UserScreen";
import AuthorizationScreen from "../screen/AuthorizationScreen";
import { gStyle } from "../style/gStyle";
import { ChatComponent } from "../components/ChatComponent";
import RegistrationScreen from "../screen/RegistrationScreen";

export const ChatandUserNavigator = () => {
  const Stack = createStackNavigator();
  const screenOptionStyle = {
    headerMode: "none",
  };

  return (
    <View style={gStyle.container}>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="ChatComponent" component={ChatComponent} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

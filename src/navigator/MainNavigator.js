import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabBarNavigato } from "./TabBarNavigator";
import { StartScreenNavigator } from "./StartScreenNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { gStyle } from "../style/gStyle";
import * as SecureStore from "expo-secure-store";

export const MainNavigator = () => {
  const Stack = createStackNavigator();
  let [isAuth, setIsAuth] = useState();

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((isAuth) =>
      setIsAuth(isAuth)
    );
    isAuth = result;
  }
  useEffect(() => {
    getValueFor("token");
  });
  return (
    <View style={gStyle.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabBarNavigato"
            component={TabBarNavigato}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

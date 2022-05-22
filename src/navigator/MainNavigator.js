import React, { useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabBarNavigato } from "./TabBarNavigator";
import { StartScreenNavigator } from "./StartScreenNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { gStyle } from "../style/gStyle";
import * as SecureStore from "expo-secure-store";

export const MainNavigator = () => {
  const Stack = createStackNavigator();
  let [result, setResult] = useState();
  async function getValueFor(key) {
    setResult = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  }
  getValueFor("token");
  return (
    <View style={gStyle.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {result == null ? (
            <>
              <Stack.Screen
                name="StartScreenNavigator"
                component={StartScreenNavigator}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="TabBarNavigato"
                component={TabBarNavigato}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

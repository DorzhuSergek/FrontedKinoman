import * as React from "react";
import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { gStyle } from "../style/gStyle";

import { StartScreenNavigator } from "./StartScreenNavigator";
import "localstorage-polyfill";
import { TabBarNavigator } from "./TabBarNavigator";

export const Navigator = () => {
  const Stack = createStackNavigator();
  let token = localStorage.getItem("token");
  return (
    <View style={gStyle.container}>
      {token == null ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Authorization"
              component={StartScreenNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <TabBarNavigator />
        </>
      )}
    </View>
  );
};

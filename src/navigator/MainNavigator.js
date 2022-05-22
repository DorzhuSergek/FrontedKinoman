import React, { useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabBarNavigato } from "./TabBarNavigator";
import { StartScreenNavigator } from "./StartScreenNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { gStyle } from "../style/gStyle";

export const MainNavigator = () => {
  const Stack = createStackNavigator();
  let token = localStorage.getItem("token");
  // let [token, setToken] = useState("");
  // setToken = localStorage.getItem("token");
  return (
    <View style={gStyle.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {token == null ? (
            <>
              <Stack.Screen
                name="Auth"
                component={StartScreenNavigator}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Tab"
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

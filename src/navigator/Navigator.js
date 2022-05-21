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

export function Navigator({ route }) {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
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
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#38354B",
                borderTopColor: "#1C1A29",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreenNavigator}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View>
                    <FontAwesome5
                      name="home"
                      size={25}
                      color={focused ? "#E82626" : "#8C8B97"}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Explorer Screen"
              component={ExplorerScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View>
                    <FontAwesome5
                      name="compass"
                      size={25}
                      color={focused ? "red" : "gray"}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="User"
              component={UserScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View>
                    <FontAwesome5
                      name="user"
                      size={25}
                      color={focused ? "red" : "gray"}
                    />
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </View>
  );
}

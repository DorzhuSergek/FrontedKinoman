import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenNavigator } from "./HomeScreenNavigator";
import ExplorerScreen from "../screen/ExplorerScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { gStyle } from "../style/gStyle";
import { ChatandUserNavigator } from "./ChatandUserNavigator";
import { NewsScreen } from "../screen/NewsScreen";
import { NewsNavigator } from "./NewsNavigator";
export const TabBarNavigato = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <View style={gStyle.container}>
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
          name="NewsScreen"
          component={NewsNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="newspaper"
                  size={25}
                  color={focused ? "red" : "gray"}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={ChatandUserNavigator}
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
    </View>
  );
};

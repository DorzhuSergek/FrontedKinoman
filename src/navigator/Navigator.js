import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenNavigator from "./HomeScreenNavigator";
import ExplorerScreen from "../screen/ExplorerScreen";
import BookMarkScreen from "../screen/BookMarkScreen";
import UserScreen from "../screen/UserScreen";
import { gStyle } from "../style/gStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screen/HomeScreen";
export const Navigator = () => {
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
          component={HomeScreen}
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
          name="Bookmark Screen"
          component={BookMarkScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="bookmark"
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
    </View>
  );
};

import * as React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExplorerScreen from "../screen/ExplorerScreen";
import { createStackNavigator } from "@react-navigation/stack";
import UserScreen from "../screen/UserScreen";
import { gStyle } from "../style/gStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import { HomeScreenNavigator } from "./HomeScreenNavigator";
import AuthorizationScreen from "../screen/AuthorizationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Navigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  let token = localStorage.getItem("token");
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
        {token !== null ? (
          <>
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
          </>
        ) : (
          <Stack.Screen name="Authorization" component={AuthorizationScreen} />
        )}
      </Tab.Navigator>
    </View>
  );
};

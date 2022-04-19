import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import MovieScreen from "../screen/MovieScreen";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerMode: "none",
};

const HomeScreenNavigator = () => {
  return (
    <View>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeScreen" component={MovieScreen} />
      </Stack.Navigator>
    </View>
  );
};

export { HomeScreenNavigator };

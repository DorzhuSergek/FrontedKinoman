import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsDetailScreen from "../screen/NewsDetailScreen";
import { NewsScreen } from "../screen/NewsScreen";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerMode: "none",
};

export const NewsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

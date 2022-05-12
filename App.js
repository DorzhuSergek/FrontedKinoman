import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/navigator/Navigator";
import AuthorizationScreen from "./src/screen/AuthorizationScreen";
import { View } from "react-native";
import { gStyle } from "./src/style/gStyle";
export default function App() {
  return (
    // <NavigationContainer>
    //   <Navigator />
    // </NavigationContainer>
    <View style={gStyle.container}>
      <AuthorizationScreen />
    </View>
  );
}

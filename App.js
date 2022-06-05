import React, { useEffect } from "react";

import { View } from "react-native";
import { gStyle } from "./src/style/gStyle";
import "localstorage-polyfill";
import { MainNavigator } from "./src/navigator/MainNavigator";

export default function App() {
  return (
    <View style={gStyle.container}>
      <MainNavigator />
    </View>
  );
}

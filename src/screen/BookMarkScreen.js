import * as React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";

export default function BookMarkScreen() {
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Text>Bookmark Screen</Text>
      </SafeAreaView>
    </View>
  );
}

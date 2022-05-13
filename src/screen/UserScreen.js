import * as React from "react";
import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";

export default function UserScreen() {
  const exit = async () => {
    localStorage.removeItem("token");
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Button onPress={exit} title="Выход" />
      </SafeAreaView>
    </View>
  );
}

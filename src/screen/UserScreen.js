import React from "react";
import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function UserScreen() {
  const navigation = useNavigation();
  const exit = async () => {
    SecureStore.deleteItemAsync("token");
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Button onPress={() => exit()} title="Выход" />
        <Button
          onPress={() => navigation.navigate("ChatComponent")}
          title="Чат"
        />
      </SafeAreaView>
    </View>
  );
}

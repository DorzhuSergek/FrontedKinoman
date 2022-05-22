import React from "react";
import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function UserScreen() {
  let result;
  async function getValueFor(key) {
    result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
    console.log(result);
  }

  getValueFor("token");
  // let [token, setToken] = useState("");
  // setToken = localStorage.getItem("token");
  const exit = async () => {
    SecureStore.deleteItemAsync("token");
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Button onPress={exit} title="Выход" />
        <Text>{result}</Text>
      </SafeAreaView>
    </View>
  );
}

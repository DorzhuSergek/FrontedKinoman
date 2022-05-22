import React from "react";
import { Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";

export default function UserScreen() {
  const navigation = useNavigation();
  let token = localStorage.getItem("token");
  // let [token, setToken] = useState("");
  // setToken = localStorage.getItem("token");
  const exit = async () => {
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Button onPress={exit} title="Выход" />
        <Text>{token}</Text>
      </SafeAreaView>
    </View>
  );
}

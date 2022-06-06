import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import PopularComponent from "../components/PopularComponent";
import { gStyle } from "../style/gStyle";
import InTrendComponents from "../components/InTrendComponents";
import InMoviesComponents from "../components/InMoviesComponents";
import BestMoviesComponents from "../components/BestMoviesComponents";
import * as SecureStore from "expo-secure-store";
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeScreen() {
  let [user, setUser] = useState();
  const netInfo = useNetInfo();
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  async function checkInternet() {
    if (netInfo.isConnected === false) {
      Alert.alert("Ошибка", "Проверьте подключение к интернету");
    }
  }
  useEffect(() => {
    getValueFor("token");
    checkInternet();
  }, []);
  return (
    <View style={gStyle.container}>
      <ScrollView>
        <PopularComponent />
        <InTrendComponents />
        <InMoviesComponents />
        <BestMoviesComponents />
      </ScrollView>
    </View>
  );
}

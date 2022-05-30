import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import PopularComponent from "../components/PopularComponent";
import { gStyle } from "../style/gStyle";
import InTrendComponents from "../components/InTrendComponents";
import InMoviesComponents from "../components/InMoviesComponents";
import BestMoviesComponents from "../components/BestMoviesComponents";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
  let [user, setUser] = useState();

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  useEffect(() => {
    getValueFor("token");
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

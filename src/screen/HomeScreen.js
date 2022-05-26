import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import PopularComponent from "../components/PopularComponent";
import { gStyle } from "../style/gStyle";
import InTrendComponents from "../components/InTrendComponents";
import InMoviesComponents from "../components/InMoviesComponents";
import BestMoviesComponents from "../components/BestMoviesComponents";

export default function HomeScreen() {
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

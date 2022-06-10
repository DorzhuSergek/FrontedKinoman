import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { gStyle } from "../style/gStyle";

export default function NewsDetailScreen({ route }) {
  return (
    <View style={gStyle.container}>
      <ScrollView>
        <SafeAreaView>
          <Text style={gStyle.titlenewsDetail}>{route.params.title}</Text>
          <Image
            source={{ uri: route.params.imageDetail }}
            style={gStyle.imageNewsDetail}
          ></Image>
          <Text style={gStyle.newsDesc}>{route.params.desc}</Text>
          <Text style={gStyle.dateNews}>{route.params.data}</Text>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

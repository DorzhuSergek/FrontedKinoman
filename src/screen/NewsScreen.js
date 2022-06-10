import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
export const NewsScreen = () => {
  const navigation = useNavigation();
  const [newsItems, setNewsItems] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await myApi.getNews();
        setNewsItems(response);
      } catch (e) {
        alert(e);
      }
    };
    getNews();
  });
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <View>
          <Text style={gStyle.chatTitleHeader}>Новости</Text>
          <FlatList
            style={{ paddingTop: 50 }}
            data={newsItems}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("NewsDetailScreen", item)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={gStyle.newsImage}
                  />
                  <Text style={gStyle.titleNews}>{item.title}</Text>
                  <Text style={gStyle.dataNews}>{item.data}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

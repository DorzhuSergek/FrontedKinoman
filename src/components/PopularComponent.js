import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
export default function PopularComponent() {
  const navigation = useNavigation();
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await myApi.getMovieList();
        setMovieItems(response);
      } catch {}
    };

    getMovies();
  }, []);
  return (
    <View>
      <FlatList
        style={{ paddingTop: 50 }}
        data={movieItems}
        horizontal
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieScreen", item)}
            >
              <Image
                source={{ uri: item.Background }}
                style={gStyle.backgroundImage}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

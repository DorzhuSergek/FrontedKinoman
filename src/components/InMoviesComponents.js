import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
export default function InMoviesComponents() {
  const navigation = useNavigation();
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await myApi.getInCinemaMovies();
        setMovieItems(response);
      } catch {}
    };

    getMovies();
  }, []);
  return (
    <View>
      <Text style={gStyle.headerText}>В кино</Text>
      <FlatList
        data={movieItems}
        horizontal
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieScreen", item)}
            >
              <Image source={{ uri: item.Poster }} style={gStyle.posterImage} />
              <Text style={gStyle.titleMovies}>{item.Name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

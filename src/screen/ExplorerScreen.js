import * as React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { gStyle } from "../style/gStyle";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import myApi from "../api/myApi";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorerScreen() {
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
    <View style={gStyle.container}>
      <SafeAreaView>
        <View>
          <TextInput placeholder="Поиск" style={gStyle.searchInput}></TextInput>
          <FlatList
            data={movieItems}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MovieScreen", item)}
                  style={gStyle.blockMovies}
                >
                  <Image
                    source={{ uri: item.Poster }}
                    style={gStyle.posterImage}
                  />
                  <View>
                    <Text style={gStyle.ExplorerTitleMovies}>{item.Name}</Text>
                    <Text style={gStyle.ExplorerTitleMovies}>{item.Genre}</Text>
                    <Text style={gStyle.ExplorerTitleMovies}>
                      {item.RaitingIMDb}
                    </Text>
                    <Text style={gStyle.ExplorerTitleMovies}>
                      {item.Vote_from_user}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

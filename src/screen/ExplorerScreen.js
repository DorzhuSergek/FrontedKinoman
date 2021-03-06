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
import SearchBar from "react-native-platform-searchbar";

export default function ExplorerScreen() {
  const navigation = useNavigation();
  const [movieItems, setMovieItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await myApi.getMovieList();
        setMovieItems(response);
        setFilteredData(response);
      } catch {}
    };
    getMovies();
  }, []);
  const searchFilter = (text) => {
    if (text) {
      const newData = movieItems.filter((item) => {
        const itemdata = item.Name ? item.Name.toUpperCase() : "".toUpperCase();
        const textdata = text.toUpperCase();
        return itemdata.indexOf(textdata) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(movieItems);
      setSearch(text);
    }
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <SearchBar
          value={search}
          onChangeText={(text) => searchFilter(text)}
          placeholder="Поиск"
          theme="dark"
          platform="android"
          style={gStyle.search}
        />
        <FlatList
          data={filteredData}
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
                  <Text style={gStyle.listActorExplorer}>
                    В ролях:
                    <Text> {item.ListActor}</Text>
                  </Text>
                  <Text style={gStyle.company}>{item.Company}</Text>
                  <Text style={gStyle.year}>{item.year}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

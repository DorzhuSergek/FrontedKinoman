import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { WebView } from "react-native-webview";
import CommentsComponents from "../components/CommentsComponents";
import AuthorizationScreen from "./AuthorizationScreen";

export default function MovieScreen({ route }) {
  return (
    <View style={gStyle.container}>
      <ScrollView>
        <View>
          <View style={gStyle.headerMovieScreen}>
            <View style={gStyle.textHeaderMovieScreen}>
              <Text style={gStyle.titleMoviesScreen}>{route.params.Name}</Text>

              <View style={gStyle.voteStar}>
                <Image
                  style={gStyle.starVote}
                  source={{
                    uri: "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/019_-_Star-256.png",
                  }}
                />

                <Text style={gStyle.raiting}>
                  {route.params.RaitingIMDb} /10
                </Text>
                <Text style={gStyle.raiting}> от IMDb</Text>
              </View>
              <Image
                source={{ uri: route.params.Poster }}
                style={gStyle.posterMovieScreen}
              />
            </View>

            <Image
              source={{ uri: route.params.Background }}
              style={gStyle.backgroundMovieScreen}
            ></Image>
          </View>
        </View>
        <View>
          <Text style={gStyle.titleSinopsis}>Обзор</Text>
          <Text style={gStyle.textSinopsis}>{route.params.sinopsis}</Text>
        </View>
        <View>
          <Text style={gStyle.trailerText}>Трейлер</Text>
          <WebView
            source={{
              uri: "https://www.youtube.com/embed/" + route.params.Trailer,
            }}
            style={gStyle.videotrailer}
            javaScriptEnabled={true}
            mixedContentMode="always"
            androidLayerType={"hardware"}
          />
        </View>
        <View>
          <Text style={gStyle.trailerText}>Коментарии</Text>
          <CommentsComponents idMovies={route.params.id} />
        </View>
      </ScrollView>
    </View>
  );
}

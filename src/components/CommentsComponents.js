import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
import PropTypes from "prop-types";
import * as SecureStore from "expo-secure-store";
import apiConfig from "../api/apiConfig";

const CommentsComponents = (props) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState();
  let [user, setUser] = useState();
  const baseUrl = apiConfig.baseUrl + apiConfig.createComment + props.idMovies;
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await myApi.getCommets(props.idMovies);
        setItems(response);
      } catch (e) {
        alert(e);
      }
      getValueFor("token");
    };
    getList();
  }, []);
  const createComment = async () => {
    try {
      await fetch(
        "https://kinomanoat.herokuapp.com/comments/{MovieId}?movieId=" +
          props.idMovies,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user,
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View style={gStyle.containerForComments}>
      <FlatList
        data={items}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <View style={gStyle.commentsList}>
            <View style={gStyle.commentsHeader}>
              <Image
                source={{
                  uri: "https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/user_people_person_users_man-512.png",
                }}
                style={gStyle.avatarComments}
              />
              <Text style={gStyle.nameComments}>{item.user.Full_Name}</Text>
            </View>
            <Text style={gStyle.commentsText}>{item.text}</Text>
          </View>
        )}
      ></FlatList>
      <TextInput
        style={gStyle.inputDataAutho}
        placeholder="Отправить комментарий"
        onChangeText={(value) => setText(value)}
      />
      <Button title="Отправить" onPress={() => createComment()} />
    </View>
  );
};

CommentsComponents.propType = {
  idMovies: PropTypes.string.isRequired,
};
export default CommentsComponents;

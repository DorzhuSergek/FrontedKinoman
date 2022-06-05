import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
import PropTypes from "prop-types";
import * as SecureStore from "expo-secure-store";

const CommentsComponents = (props) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState();
  let [user, setUser] = useState();
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
  }, [items]);
  const createComment = async () => {
    if (user === null) {
      Alert.alert("Регистрация", "вам нужно зарегистрироваться");
    } else {
      if (text === "") {
        Alert.alert("Ошибка", "Пустое поле");
      } else {
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
            },
            setText("")
          );
        } catch (e) {
          alert(e);
        }
      }
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
                  uri: item.user.avatar,
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
        placeholderTextColor="#a7a7a7"
        value={text}
      />
      <View style={gStyle.containerbtn}>
        <Button
          title="Отправить"
          onPress={() => createComment()}
          color="#38354B"
        />
      </View>
    </View>
  );
};

CommentsComponents.propType = {
  idMovies: PropTypes.string.isRequired,
};
export default CommentsComponents;

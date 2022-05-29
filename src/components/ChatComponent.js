import React from "react";
import { View, Text, Image, FlatList, TextInput, Button } from "react-native";
import { gStyle } from "../style/gStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import myApi from "../api/myApi";
import { useEffect, useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import apiConfig from "../api/apiConfig";
import * as SecureStore from "expo-secure-store";

export const ChatComponent = () => {
  const [message, setMessage] = useState([]);
  let [text, setText] = useState();
  let [user, setUser] = useState();
  const baseUrl = apiConfig.baseUrl + apiConfig.chat;
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  const getChat = async () => {
    try {
      const response = await myApi.getChat();
      setMessage(response);
    } catch (e) {
      alert(e);
    }
    getValueFor("token");
  };
  useEffect(() => {
    getChat();
  }, []);
  const postChat = async () => {
    try {
      await fetch(baseUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user,
        },
        body: JSON.stringify({
          Text: text,
        }),
      });
      console.log(user);
      setText("");
      getChat();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView behavior="padding">
          <Text style={gStyle.chatTitleHeader}>Чат</Text>
          <FlatList
            data={message}
            renderItem={({ item }) => (
              <View style={gStyle.containerChat}>
                <View style={gStyle.containerChatMessage}>
                  <Image
                    source={{
                      uri: "https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/user_people_person_users_man-512.png",
                    }}
                    style={gStyle.avatarComments}
                  />
                  <Text style={gStyle.chatMessageBox}>{item.Text}</Text>
                </View>
                <View style={gStyle.containerUserData}>
                  <Text style={gStyle.chatUser}>{item.user.Full_Name} </Text>
                  <Text style={gStyle.chatUser}>18:21</Text>
                </View>
              </View>
            )}
          />
          <View style={gStyle.containerinputAndButton}>
            <TextInput
              style={gStyle.inputMessage}
              placeholder="Введите сообщение"
              placeholderTextColor={"#fff"}
              onChangeText={(value) => setText(value)}
            />
            <Button title="Отправить" onPress={() => postChat()} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

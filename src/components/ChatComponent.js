import React from "react";
import { View, Text, Image, FlatList, TextInput } from "react-native";
import { gStyle } from "../style/gStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import myApi from "../api/myApi";
import { useEffect, useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const ChatComponent = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await myApi.getChat();
        setMessage(response);
      } catch (e) {
        alert(e);
      }
    };
    getChat();
  }, []);
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
          <TextInput
            style={gStyle.inputMessage}
            placeholder="Введите сообщение"
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

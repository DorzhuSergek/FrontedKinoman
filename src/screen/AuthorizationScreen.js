import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  ToastAndroid,
  Alert,
  Text,
} from "react-native";
import { gStyle } from "../style/gStyle";
import apiConfig from "../api/apiConfig";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AuthorizationScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const baseUrlAuth = apiConfig.baseUrl + apiConfig.login;

  let isAuth;
  let token = "";

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    isAuth = result;
  }
  React.useEffect(() => {
    getValueFor("token");
  });

  const getToken = async () => {
    //метод для отправки данных
    try {
      await fetch(baseUrlAuth, {
        method: "POST",
        headers: {
          //заголовок запроса
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //тело запроса
          email: name,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          token = data.access_token;
          save("token", token); //сохраняем токен
          if (token != null) {
            navigation.navigate("TabBarNavigato"); //переходим на главный экран
          } else {
            //если данные введены не верно
            Alert.alert("Ошибка", "Неверные данные"); //выводим сообщение
          }
        });
    } catch (error) {
      ToastAndroid.show("Повторите попытку", ToastAndroid.SHORT); //При ошибке выводит сообщение
      console.error(error);
    }
  };

  return (
    <View style={gStyle.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={gStyle.container}
      >
        <View style={gStyle.containerAuth}>
          <Image
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/cartoon-snack/128/popcorn-256.png",
            }}
            style={gStyle.imageRegistration}
          />
        </View>
        <View style={gStyle.textInputContainer}>
          <TextInput
            keyboardType="email-address"
            style={gStyle.inputDataAutho}
            placeholder="User Name"
            placeholderTextColor="#A8A8A8"
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            secureTextEntry={true}
            style={gStyle.inputDataAutho}
            placeholder="Password"
            placeholderTextColor="#A8A8A8"
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <Button
          title="Авторизоваться"
          style={gStyle.buttonReg}
          onPress={() => getToken()}
          color="#38354B"
        />
        <Button
          title="Регистрация"
          onPress={() => navigation.navigate("RegistrationScreen")}
          color="#38354B"
        />
        <Text>{isAuth}</Text>
      </KeyboardAwareScrollView>
    </View>
  );
}

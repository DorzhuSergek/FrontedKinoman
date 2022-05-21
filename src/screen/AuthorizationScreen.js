import React, { useState } from "react";
import { View, TextInput, Image, Button, ToastAndroid } from "react-native";
import { gStyle } from "../style/gStyle";
import apiConfig from "../api/apiConfig";
import { useNavigation } from "@react-navigation/native";

export default function AuthorizationScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  let token = "";
  const baseUrlAuth = apiConfig.baseUrl + apiConfig.login;
  const getToken = async () => {
    try {
      const h1 = await fetch(baseUrlAuth, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          token = data.access_token;
          localStorage.setItem("token", token);
          if (token != null) {
            console.log(token);
          } else {
            ToastAndroid.show("Повторите попытку", ToastAndroid.SHORT);
          }
        });
    } catch (error) {
      ToastAndroid.show("Повторите попытку", ToastAndroid.SHORT);
      console.error(error);
    }
  };

  return (
    <View style={gStyle.container}>
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
        onPress={getToken}
      />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate("RegistrationScreen")}
      />
    </View>
  );
}

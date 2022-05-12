import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { gStyle } from "../style/gStyle";
import myApi from "../api/myApi";
import apiConfig from "../api/apiConfig";

export default function AuthorizationScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
          console.log(data.access_token);
        });
    } catch (error) {
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
    </View>
  );
}

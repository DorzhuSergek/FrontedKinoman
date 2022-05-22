import React, { useState } from "react";
import { View, TextInput, Image, Button, Text } from "react-native";
import { gStyle } from "../style/gStyle";
import myApi from "../api/myApi";
import apiConfig from "../api/apiConfig";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RegistrationScreen() {
  const baseUrlAuth = apiConfig.baseUrl + apiConfig.registration;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  let result;
  async function getValueFor(key) {
    result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  }
  const registration = async () => {
    try {
      const h1 = await fetch(baseUrlAuth, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Full_Name: name,
          Email: email,
          password: password,
          password2: password2,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("Успешно");
          getValueFor("token");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <Text>{result}</Text>
        <View style={gStyle.containerAuth}>
          <Image
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/cartoon-snack/128/popcorn-256.png",
            }}
            style={gStyle.imageRegistration}
          />
        </View>
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Имя"
          style={gStyle.inputDataAutho}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Email"
          style={gStyle.inputDataAutho}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Пароль"
          style={gStyle.inputDataAutho}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Повторите пароль"
          style={gStyle.inputDataAutho}
          onChangeText={(value) => setPassword2(value)}
        />
        <Button
          title="Авторизоваться"
          style={gStyle.buttonReg}
          onPress={registration}
        />
      </SafeAreaView>
    </View>
  );
}

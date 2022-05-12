import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { gStyle } from "../style/gStyle";
import myApi from "../api/myApi";
import apiConfig from "../api/apiConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrationScreen() {
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
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
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Email"
          style={gStyle.inputDataAutho}
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Пароль"
          style={gStyle.inputDataAutho}
        />
        <TextInput
          placeholderTextColor="#A8A8A8"
          placeholder="Повторите пароль"
          style={gStyle.inputDataAutho}
        />
        <Button title="Авторизоваться" style={gStyle.buttonReg} />
      </SafeAreaView>
    </View>
  );
}

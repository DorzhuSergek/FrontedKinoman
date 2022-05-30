import React, { useState } from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";
import { gStyle } from "../style/gStyle";
import apiConfig from "../api/apiConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function RegistrationScreen() {
  const navigation = useNavigation();

  const baseUrlAuth = apiConfig.baseUrl + apiConfig.registration;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");

  const registration = async () => {
    try {
      if (name === "" && email === "" && password === "" && password2 === "") {
        //валидация на заполненность полей
        Alert.alert("Ошибка", "Заполните поля");
      } else {
        await fetch(baseUrlAuth, {
          //логика регистрации пользователя
          method: "POST",
          headers: {
            //заголовок запроса
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //тело запроса
            Full_Name: name,
            Email: email,
            password: password,
            password2: password2,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            //если все успешно
            console.log(data);
            Alert.alert("Успешно", "Введите данные заново"); //выводим сообщение
            navigation.navigate("AuthorizationScreen"); //и переходим на экран авторизации
          });
      }
    } catch (error) {
      //в случаи ошибки
      alert(e); //выводим проблему на экран
    }
  };
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
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
            secureTextEntry={true}
            style={gStyle.inputDataAutho}
            onChangeText={(value) => setPassword(value)}
          />
          <TextInput
            secureTextEntry={true}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

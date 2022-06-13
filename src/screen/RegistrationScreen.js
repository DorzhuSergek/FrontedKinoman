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
      if (name === "" || email === "" || password === "" || password2 === "") {
        //валидация на заполненность полей
        Alert.alert("Ошибка", "Заполните поля");
      }
      if (password !== "" && password2 !== "") {
        let reg =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(email) === false) {
          Alert.alert("Ошибка", "Введите корректную почту");
          return false;
        } else {
          if (password.length < 6) {
            Alert.alert("Ошибка", "Пароль должен состоять из шести символов");
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
                Alert.alert("Успешно", "Введите данные заново"); //выводим сообщение
                navigation.navigate("UserScreen"); //и переходим на экран авторизации
              });
          }
        }
      } else {
        Alert.alert("Ошибка", "Пожалуйста, введите поля корректно");
      }
    } catch (error) {
      //в случаи ошибки
      alert(error); //выводим проблему на экран
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
          <View style={gStyle.containerbtn}>
            <Button
              title="Авторизоваться"
              style={gStyle.buttonReg}
              onPress={registration}
              color="#38354B"
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

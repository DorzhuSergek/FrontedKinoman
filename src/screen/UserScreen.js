import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Button,
  Text,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import apiConfig from "../api/apiConfig";
import * as Updates from "expo-updates";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { reloadAsync } from "expo-updates";

export default function UserScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  let [user, setUser] = useState();
  const [userItem, setUserItem] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const baseUrlAuth = apiConfig.baseUrl + apiConfig.login;

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value).then((user) => {
      setUser(user);
    });
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  useEffect(() => {
    getValueFor("token");
    getUserMe();
  }, [user]);

  const getToken = async () => {
    //метод для отправки данных
    if (name === "" || password === "") {
      Alert.alert("Ошибка", "Заполните поля");
    } else {
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
            user = data.access_token;
            save("token", user); //сохраняем токен
            if (user != null) {
              console.log(user); //переходим на главный экран
            } else {
              //если данные введены не верно
              Alert.alert("Ошибка", "Неверные данные"); //выводим сообщение
            }
          });
      } catch (error) {
        ToastAndroid.show("Повторите попытку", ToastAndroid.SHORT); //При ошибке выводит сообщение
        console.error(error);
      }
    }
  };
  let urlImage;
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  useEffect(() => {
    getUserMe();
    getValueFor("token");
  }, [user]);
  const exit = async () => {
    SecureStore.deleteItemAsync("token").then((user) => {
      setUser(user);
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      let newfile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      handleUpload(newfile);
    }

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Diplom");
    data.append("cloud_name", "deb3voazt");
    fetch("https://api.cloudinary.com/v1_1/deb3voazt/image/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        urlImage = data.secure_url;
        updateImage(urlImage);
        getUserMe();
      });
  };

  const updateImage = async (image) => {
    try {
      await fetch(apiConfig.baseUrl + apiConfig.updateImage, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + user,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: image,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (e) {
      alert(e);
    }
  };
  const getUserMe = async () => {
    getValueFor("token");
    try {
      await fetch(apiConfig.baseUrl + apiConfig.userMe, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + user,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserItem(data);
        });
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        {user == null ? (
          <>
            <View style={gStyle.textInputContainer}>
              <TextInput
                keyboardType="email-address"
                style={gStyle.inputDataAutho}
                placeholder="Почта"
                placeholderTextColor="#A8A8A8"
                onChangeText={(value) => setName(value)}
              />
              <TextInput
                secureTextEntry={true}
                style={gStyle.inputDataAutho}
                placeholder="Пароль"
                placeholderTextColor="#A8A8A8"
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={gStyle.containerbtn}>
              <Button
                title="Авторизоваться"
                style={gStyle.buttonReg}
                onPress={() => getToken()}
                color="#38354B"
              />
            </View>
            <View style={gStyle.containerbtn}>
              <Button
                title="Регистрация"
                onPress={() => navigation.navigate("RegistrationScreen")}
                color="#38354B"
              />
            </View>
          </>
        ) : (
          <View>
            <View>
              <View style={gStyle.containerforUser}>
                <Image
                  source={{ uri: userItem.avatar }}
                  style={gStyle.avatarUser}
                />
                <View style={gStyle.nameEmail}>
                  <Text style={gStyle.nameUser}>{userItem.Full_Name}</Text>
                  <Text style={gStyle.emailUser}>{userItem.Email}</Text>
                </View>
              </View>
              <Text onPress={pickImage} style={gStyle.buttonChangeImage}>
                Изменить аватар
              </Text>
            </View>
            <View style={gStyle.containerbtn}>
              <Button
                onPress={() => navigation.navigate("ChatComponent")}
                title="Чат"
                color="#38354B"
              />
            </View>
            <View style={gStyle.containerbtn}>
              <Button onPress={() => exit()} title="Выход" color="#38354B" />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { Text, View, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import apiConfig from "../api/apiConfig";

export default function UserScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  let [user, setUser] = useState();
  const [userItem, setUserItem] = useState([]);
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key).then((user) =>
      setUser(user)
    );
    user = result;
  }
  useEffect(() => {
    getUserMe();
    console.log(user);
  }, []);
  const exit = async () => {
    SecureStore.deleteItemAsync("token");
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

    console.log(result);

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
        console.log(data.secure_url);
        urlImage = data.secure_url;
      });
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
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        {image && (
          <Image source={{ uri: userItem.avatar }} style={gStyle.avatarUser} />
        )}
        <Button title="Аватар" onPress={pickImage} />

        <Button onPress={() => exit()} title="Выход" />
        <Button
          onPress={() => navigation.navigate("ChatComponent")}
          title="Чат"
        />
        <Text>{userItem.Email}</Text>
        <Text>{apiConfig.baseUrl + apiConfig.userMe}</Text>
        <Image source={{ uri: userItem.avatar }} style={gStyle.avatarUser} />
      </SafeAreaView>
    </View>
  );
}

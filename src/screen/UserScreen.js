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
        urlImage = data.secure_url;
        console.log(urlImage);
      });
    updateImage();
  };

  const updateImage = async () => {
    // try {
    //   await fetch(apiConfig.baseUrl + apiConfig.updateImage, {
    //     method: "PUT",
    //     headers: {
    //       accept: "application/json",
    //       Authorization: "Bearer " + user,
    //       "Content-Type": "application/json",
    //     },
    //     body: urlImage,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // } catch (e) {
    //   alert(e);
    // }
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
      alert(e);
    }
  };

  return (
    <View style={gStyle.container}>
      <SafeAreaView>
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
      </SafeAreaView>
    </View>
  );
}

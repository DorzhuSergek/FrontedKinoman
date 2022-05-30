import React, { useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

export default function UserScreen() {
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  let urlImage;

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
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        {image && <Image source={{ uri: image }} style={gStyle.avatarUser} />}
        <Button title="Аватар" onPress={pickImage} />

        <Button onPress={() => exit()} title="Выход" />
        <Button
          onPress={() => navigation.navigate("ChatComponent")}
          title="Чат"
        />
      </SafeAreaView>
    </View>
  );
}

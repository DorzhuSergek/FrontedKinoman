import React from "react";
import { Text, View, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyle } from "../style/gStyle";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

export default function UserScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);
  let pickerResult;
  const exit = async () => {
    SecureStore.deleteItemAsync("token");
  };
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        {selectedImage !== null}
        <Image
          source={{ uri: selectedImage.localUri }}
          style={gStyle.avatarUser}
        />
        <Button title="Аватар" onPress={openImagePickerAsync} />

        <Button onPress={() => exit()} title="Выход" />
        <Button
          onPress={() => navigation.navigate("ChatComponent")}
          title="Чат"
        />
      </SafeAreaView>
    </View>
  );
}

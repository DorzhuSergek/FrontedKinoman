import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import myApi from "../api/myApi";
import { gStyle } from "../style/gStyle";
import PropTypes from "prop-types";

const CommentsComponents = (props) => {
  const [item, setItems] = useState([]);
  let user = "";
  useEffect(() => {
    const getList = async () => {
      let response = null;
      try {
        response = await myApi.getCommets(props.idMovies);
        setItems(response);
      } catch {}
    };
    getList();
  }, []);

  return (
    <View>
      <FlatList
        data={item}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <View style={gStyle.commentsList}>
            <View style={gStyle.commentsHeader}>
              <Image
                source={{
                  uri: "https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/user_people_person_users_man-512.png",
                }}
                style={gStyle.avatarComments}
              />
              <Text style={gStyle.nameComments}>{item.user.Full_Name}</Text>
            </View>
            <Text style={gStyle.commentsText}>{item.text}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

CommentsComponents.propType = {
  idMovies: PropTypes.string.isRequired,
};
export default CommentsComponents;

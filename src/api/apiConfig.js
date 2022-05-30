import axios from "axios";

const apiConfig = {
  baseUrl: "https://kinomanoat.herokuapp.com",
  login: "/login",
  registration: "/user",
  createComment: "/comments/",
  chat: "/chat/",
  userMe: "/users/me",
  updateImage: "/update/user",
};
export default apiConfig;

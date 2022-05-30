import axios from "axios";

const apiConfig = {
  baseUrl: "https://kinomanoat.herokuapp.com",
  login: "/login",
  registration: "/user",
  createComment: "/comments/",
  chat: "/chat/",
  userMe: "/users/me",
};
export default apiConfig;

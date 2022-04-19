import axiosClient from "./axiosClient";

const myApi = {
  getMovieList() {
    const url = "/movies";
    return axiosClient.get(url);
  },
};

export default myApi;

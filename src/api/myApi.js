import axiosClient from "./axiosClient";

const myApi = {
  getMovieList() {
    const url = "/movies";
    return axiosClient.get(url);
  },
  getPopularMovies() {
    const url = "/movies/popular";
    return axiosClient.get(url);
  },
  getInCinemaMovies() {
    const url = "/movies/in_The_Cinema";
    return axiosClient.get(url);
  },
  getBestMovies() {
    const url = "movies/best_Movies";
    return axiosClient.get(url);
  },
  getCommets(movieId) {
    const url = "comments/" + movieId;
    return axiosClient.get(url);
  },
};

export default myApi;

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

export function register(user) {
  return http.post(apiEndPoint + "/register", {
    // new user
    email: user.email,
    password: user.password,
    username: user.username
  });
}

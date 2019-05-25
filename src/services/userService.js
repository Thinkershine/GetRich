import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

export function register(user) {
  return http.post(apiEndPoint + "/register", {
    email: user.email,
    password: user.password,
    username: user.username
  });
}

export function login(email, password) {
  return http.post(apiEndPoint + "/login", { email, password });
}

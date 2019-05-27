import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function register(user) {
  return http.post(apiEndPoint + "/register", {
    email: user.email,
    password: user.password,
    username: user.username
  });
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint + "/login", {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt.token);
}

export async function logout() {
  // Remove User Token
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};

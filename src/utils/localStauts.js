import {use} from "element-ui/src/locale";

let Base64 = require('js-base64').Base64

export function setToken(token) {
  window.localStorage.setItem("token", token);
}

export function setUserInfo(userInfo) {
  window.localStorage.setItem("userInfo", Base64.encode(userInfo));
}

export function getToken() {
  return window.localStorage.getItem("token")
}

export function getUserInfo() {
  return Base64.decode(window.localStorage.getItem("userInfo"))
}

export function logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userInfo");
}

export function isLogin() {
  return getUserInfo() != null && getToken()!=null
}

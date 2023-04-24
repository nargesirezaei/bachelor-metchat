import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
  userInfo: () => api.call("post", apiConfig.accountUrl + "/user-info/"),

  login: (userName, password) =>
    api.call("post", apiConfig.accountUrl + "/login", {
      email: userName,
      password,
    }),

  register: (data) =>
    api.call("post", apiConfig.accountUrl + "/register", data),

  logout: () => {
    api.call("post", apiConfig.accountUrl + "/logout");
  },
};

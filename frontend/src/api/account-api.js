import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
    userInfo: () =>
        api.directCall("post", apiConfig.accountUrl + "/user-info/"),

    login: (userName, password) =>
        api.directCall("post", apiConfig.accountUrl + "/login", {
            userName,
            password,
        }),

    register: (data) =>
        api.directCall("post", apiConfig.accountUrl + "/register", data),
};

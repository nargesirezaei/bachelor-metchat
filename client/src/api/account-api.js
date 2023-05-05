import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
    userInfo: () => api.call("post", apiConfig.accountUrl + "/user-info/"),

    initProfile: () =>
        api.call("post", apiConfig.accountUrl + "/init-profile/"),

    login: (userName, password) =>
        api.call("post", apiConfig.accountUrl + "/login", {
            email: userName,
            password,
        }),

    register: (data) =>
        api.call("post", apiConfig.accountUrl + "/register", data),

    changePassword: (data) =>
        api.call("post", apiConfig.accountUrl + "/change-password", data),

    logout: () => {
        api.call("post", apiConfig.accountUrl + "/logout");
    },
};

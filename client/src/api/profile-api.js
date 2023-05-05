import { api } from "./api";
import { apiConfig } from "./config";

export const profileApi = {
    profile: (data) =>
        api.call("post", apiConfig.profileUrl + "/profile", data),
    changeBio: (data) =>
        api.call("post", apiConfig.profileUrl + "/change-bio", data),
    changeAvatar: (data) =>
        api.call("post", apiConfig.profileUrl + "/change-avatar", data),
};

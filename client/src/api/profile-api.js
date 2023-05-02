import { api } from "./api";
import { apiConfig } from "./config";

export const profileApi = {
    me: () => api.call("get", apiConfig.profileUrl + "/me"),
};

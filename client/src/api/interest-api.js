import { api } from "./api";
import { apiConfig } from "./config";

export const interestApi = {
    getAll: () => api.call("get", apiConfig.interestsUrl + "/interests"),
};

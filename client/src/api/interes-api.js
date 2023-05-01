import { api } from "./api";
import { apiConfig } from "./config";

export const interresApi = {
    interests: () => api.call("get", apiConfig.interestsUrl + "/interests"),
};

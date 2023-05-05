import { api } from "./api";
import { apiConfig } from "./config";

export const userInterestApi = {
    create: (data) =>
        api.call("post", apiConfig.userInterestsUrl + "/create", data),
    delete: (data) =>
        api.call("delete", apiConfig.userInterestsUrl + "/delete", data),
};

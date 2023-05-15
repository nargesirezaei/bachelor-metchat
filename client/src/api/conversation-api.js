import { api } from "./api";
import { apiConfig } from "./config";

export const conversationApi = {
    add: (data) => api.call("post", apiConfig.conversationUrl + "/", data),
    delete: (conversationId) =>
        api.call("delete", apiConfig.conversationUrl + `/${conversationId}`),
    getAll: (data) =>
        api.call("post", apiConfig.conversationUrl + "/get-all", data),
};

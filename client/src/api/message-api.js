import { api } from "./api";
import { apiConfig } from "./config";

export const messageApi = {
    init: (data) => api.call("post", apiConfig.messageUrl + "/init", data),
    getAllMessagesByConversationId: (conversationId) =>
        api.call("get", apiConfig.messageUrl + `/${conversationId}`),
    send: (data) => api.call("post", apiConfig.messageUrl + "/", data),
};

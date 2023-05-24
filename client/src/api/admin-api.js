import { api } from "./api";
import { apiConfig } from "./config";

export const adminApi = {
  add: (data) => api.call("post", apiConfig.conversationUrl + "/", data),

  delete: (conversationId) =>
    api.call("delete", apiConfig.conversationUrl + `/${conversationId}`),

  getAll: (data) =>
    api.call("post", apiConfig.adminConversationUrl + "/get-all", data),

  getConversation: (conversationId) =>
    api.call(
      "get",
      apiConfig.adminConversationUrl + `/getConversation/${conversationId}`
    ),

  //delete all conversations
  deleteAllConversations: () =>
    api.call(
      "delete",
      apiConfig.adminConversationUrl + "/delete-all-conversations"
    ),
};

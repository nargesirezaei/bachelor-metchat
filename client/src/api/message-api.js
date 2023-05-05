import { api } from "./api";
import { apiConfig } from "./config";

export const messageApi = {
    init: (data) => api.call("post", apiConfig.messageUrl + "/init", data),
};

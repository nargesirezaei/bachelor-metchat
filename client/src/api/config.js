const host = "http://localhost:" + "8088";
const chat = "ws://localhost:" + "8000";
export const apiConfig = {
    baseUrl: host,
    chatUrl: chat,
    accountUrl: host + "/authentication",
    contactUrl: host + "/contacts",
    messageUrl: host + "/messages",
    conversationUrl: host + "/conversations",
    interestsUrl: host + "/interests",
    userInterestsUrl: host + "/user-interests",
    profileUrl: host + "/profile",
};

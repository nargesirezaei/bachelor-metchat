const express = require("express");
const { verifyaccess } = require("../services/authorization");
const multer = require("multer");
const app = express();

const profile = require("../services/profile");
const upload = multer({ dest: "uploads/" });

app.post("/profile", verifyaccess, profile.profile);
app.get("/user/:userId", verifyaccess, profile.userInfo);
app.post("/change-bio", verifyaccess, profile.changeBio);
app.post(
    "/upload",
    verifyaccess,
    upload.single("avatar"),
    profile.uploadAvatar
);
app.post("/change-avatar", verifyaccess, profile.changeAvatar);

module.exports = app;

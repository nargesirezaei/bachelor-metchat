const express = require('express');
const { verifyaccess } = require('../services/authorization');
const multer = require('multer');
const app = express();
const profile = require('../services/profile');

const upload = multer({ dest: 'uploads/' });


app.get("/me", verifyaccess,profile.me);
app.get("/user/:userId",verifyaccess,profile.userInfo);
app.post("/change-bio",verifyaccess,profile.changeBio);
app.post('/upload', verifyaccess, upload.single('avatar'),profile.uploadAvatar);
  

module.exports = app;

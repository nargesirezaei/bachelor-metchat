const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("i chat rest api");
});

app.get("/home", async (req, res) => {
    res.send("i chat rest api");
});

module.exports = app;
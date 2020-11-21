const express = require("express");
const app = express();

var AuthController = require("./Auth/adminlogin");
app.use("/login",AuthController);

var AddNewsController = require("./News/newsform");
app.use("/addnews",AddNewsController);

var EditNewsController = require("./News/editnews");
app.use("/editnews",EditNewsController);


module.exports = app;
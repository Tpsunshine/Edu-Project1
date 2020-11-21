const express = require("express");
const chalk = require("chalk");
const app = require("./app");
app.set("view engine","ejs");
app.set("views","./views");
const mongoose = require("mongoose");

app.use(express.static(__dirname+"/public"));
const port = process.env.PORT||8000;

mongoose.connect("mongodb://localhost:27017/local");

mongoose.connection.on("connected",()=>{
    console.log(chalk.green("connected to mongodb usersdb"));
});


app.get("/",(req,res)=>{
    res.redirect("/login/");
});

app.listen(port,()=>{
    console.log("App is listening on port %s",port);
});

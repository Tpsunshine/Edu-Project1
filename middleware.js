const express = require("express");
const adminusers = require("./model/users");
const config = require("./config");
const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");


const authcheck = function(req,res,next){
    
    const token = localstorage.getItem("authtoken");
    console.log(chalk.yellow("Entered JWT middleware and token is"));
        console.log(token);
          
    jwt.verify(token,config.secret,(err,decoded)=>{
        
        if(err){
            return res.status(401).send("Access Denied");
        }
        adminusers.findById(decoded.id,(err,data)=>{
            if(err){
                throw err;
            }
            if(!data){
                return res.status(401).send("Access Denied")
            }
            else{
                next();
            }
        });
    });

}

module.exports = {authcheck};
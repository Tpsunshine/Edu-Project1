const express = require("express");
const router = express.Router();
const newsdb = require("../model/news");
const middleware = require("../middleware");
const bodyparser = require("body-parser");
const chalk = require("chalk");
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.get("/submit",middleware.authcheck,(req,res)=>{

    var newstitle = req.query.title;
    var newsdescription = req.query.description;
    var newsimageurl = req.query.imageurl;
    var newspublishedat = req.query.publishedat;
    var date = new Date();
    console.log(date.getHours());
    var publisheddate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
 

    console.log(chalk.red("The Data from the req body is "));
    console.log(newstitle);
    newsdb.collection.insertOne({title:newstitle,description:newsdescription,imageurl:newsimageurl,publishedat:newspublishedat,publishedon:publisheddate},(err,data)=>{
            console.log(chalk.yellow(data));
            res.redirect("/editnews/getall");
    });


});






module.exports = router;
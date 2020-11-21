const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const newsdb = require("../model/news");
const bodyparser = require("body-parser");
const chalk = require("chalk");
const authcheck = require("../middleware");

router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.get("/getall",authcheck.authcheck,(req,res)=>{

    newsdb.find({},(err,data)=>{
        res.render("editnews",{data:data});
    })

router.get("/addnews",authcheck.authcheck,(req,res)=>{
        res.render("addnews");
});

router.post("/savechanges",authcheck.authcheck,(req,res)=>{

    var searchbytitle = req.body.oldtitle;
    var editedtitle = req.body.title;
    var editeddescription = req.body.description;
    var editedpublishedat = req.body.publishedat;
    var publisheddate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
 
    newsdb.updateOne({"title":searchbytitle},{$set:{"title":editedtitle,"description":editeddescription,"publishedat":editedpublishedat,publishedon: publisheddate}},(err,data)=>{
        console.log(chalk.yellow("The data is"));    
        // var myres= JSON.stringify(data);
        if(data.nModified ==0){
            res.send("nothing modified");
        }
        else{
            newsdb.findOne({"title":searchbytitle},(err,resdata)=>{
                res.send(resdata);
            });

        }
    });

});


});


module.exports = router;
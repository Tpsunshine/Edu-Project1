const express = require("express");
const router = express.Router();
const adminuser = require("../model/users");
const chalk = require("chalk");

const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const config = require("../config");
const middleware = require("../middleware");
const bcrypt = require("bcrypt");

const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.get("/",(req,res)=>{
    res.render("loginpage",{error:""});
});

router.post("/homepage", (req,res)=>{
        var loginemail = req.body.email;
        var loginpassword = req.body.password;

        adminuser.collection.findOne({"email":loginemail},(err,data)=>{
            if(err){
                throw err;
            }
            console.log(chalk.blue("The data._id is "));
            console.log(data._id);
           
            
            if(data!=null){
                var passwordvalid = bcrypt.compareSync(loginpassword,data.password);
                if(data.email!=loginemail || passwordvalid!=true){ 

                    res.render("loginpage",{error:"Your email or password is incorrect!!"});
                }
                else{
                     var token = jwt.sign({id:data._id},config.secret,{expiresIn: 86400});
                    localstorage.setItem('authtoken',token);
                    console.log("The Token from auth is");
                    console.log(chalk.green(localstorage.getItem("authtoken")));
                    console.log("email and password are correct");
                    res.render("addnews");
                }
            }
            else{
                console.log("data is null");
                res.render("loginpage",{error:"Your email or password is incorrect!!"});   
            }
        });

});

router.get("/hello",(req,res)=>{
    console.log(chalk.red("*********The Auth from token is"))
    console.log(localstorage.getItem("authtoken"));
})

router.post("/register",(req,res)=>{

    var email = req.body.registeremail;
    var password = req.body.registerpassword;
    var bcryptedpassword = bcrypt.hashSync(password,8);
    if(email!="" || password!=""){
            adminuser.collection.insertOne({email:email,password:bcryptedpassword},(err,data)=>{
                if(err){
                    throw err;
                }
                console.log(chalk.green("Successfully added the user to DB"));
                res.render("loginpage",{error:"You have successfully registered, Please login!"});
            });
    }
    else{
        res.render("loginpage",{error:"Please Enter valid Email / Password"});
    }

});

router.get("/logout",(req,res)=>{

    localstorage.removeItem("authtoken");
    res.redirect("/login/");

});



module.exports = router;
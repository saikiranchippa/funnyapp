const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root123",
    database: "crazychicken"
});

db.connect((err) => {
    if(err){
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get("/", (req,res)=>{
    res.redirect("/signup");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",(req,res)=>{
    const {username,email,password}=req.body;

    db.query(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username,email,password],
        (err)=>{
            if(err) throw err;
            res.redirect("/login");
        }
    );
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",(req,res)=>{
    const {email,password}=req.body;

    db.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email,password],
        (err,result)=>{
            if(result.length>0){
                res.render("home",{user:result[0]});
            }else{
                res.send("Wrong Credentials 🐔");
            }
        }
    );
});

app.listen(3000,()=>{
    console.log("Server Running");
});

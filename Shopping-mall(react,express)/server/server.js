const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "manager",
//   database: "shopping",
//   password: "11111111",
// });

const dbInfo = JSON.parse(fs.readFileSync(__dirname+'/db.json', 'UTF-8'));
const pool = mysql.createPool({
    host: dbInfo.host,
    user: dbInfo.user,
    database: dbInfo.database,
    password: dbInfo.pw,
  });

let sessionStore = new MySQLStore({}, pool);

const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.use(session({
  secret:"asdfasffdsa",
  resave:false,
  saveUninitialized:true,
  store: sessionStore
}))


app.get("/api", (req, res) => {
  res.json({ username: "" });
});

app.get("/api/shop", (req, res) => {});

app.get("/shop", async (req, res) => {
  const query = "SELECT * FROM product";
  try {
    const data = await pool.query(query);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/shop/buy/:id", async (req, res) => {
  const query = "SELECT * FROM product WHERE id=?";
  try {
    const data = await pool.query(query, [req.params.id]);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post('/checkId', async(req, res) => {
  let id = req.body.id;

  let query = `select * from user where id = ?`;
  try{
    const data = await pool.query(query, [id]);
    if(!data[0][0]){
      res.send({
        "error": false,
        });
    }else{
      res.send({
        "error": true,
        });
    }
  }catch(err){
    return res.status(500).json(err);
  }
});

app.post("/process_login", async (req, res) => {
  let {id, pw} = req.body;

  let query = `select * from user where id = ?`;
  try{
    const idData = await pool.query(query, [id]);
    if(!idData[0][0]){
      res.send({
        "login": false,
        "message": "id ircorrect"
        });
    }else{
      crypto.pbkdf2(idData[0][0].pw, idData[0][0].salt, 103011, 64, 'sha512', async(err, key) =>{
        try{
          query = `select * from user where pw = ?`;
          const pwData = await pool.query(query, [key]);
          if(!pwData[0][0]){
            res.send({
              "login": false,
              "message": "pw ircorrect"
              });
          }else{
            res.send({
              "login": true,
              });
          }
        }catch(err){
          return res.status(500).json(err);
        }
      })
    }
  }catch(err){
    return res.status(500).json(err);
  }
});

app.post("/process_register", async (req, res) => {
  let {id, pw, email, birth} = req.body;

  let query = `insert into user value(null, ?, ?, ?, ?, ?)`

  crypto.randomBytes(64, (err, buf) =>{
    crypto.pbkdf2(pw, buf.toString('base64'), 103011, 64, 'sha512', async(err, key) =>{
      try{
        await pool.query(query, [id, key, email, birth, buf]);
      }catch(err){
        return res.status(500).json(err);
      }
    
      console.log(key.toString('base64'));
    })
  })
  res.redirect('http://localhost:3000/home');
});

app.listen(port, () => {
  console.log(`Listening on potr ${port}`);
});
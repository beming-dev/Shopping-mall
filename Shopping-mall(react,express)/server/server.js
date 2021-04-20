const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fs = require('fs');
const bodyParser = require('body-parser');

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
  let {id, pw, email, birth} = req.body || ' ';

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
})

app.post("/process_register", async (req, res) => {
  query = `insert into user value(null, ?, ?, ?, ?)`
  try{
    const data = await pool.query(query, [id, pw, email, birth]);
    return res.json(data[0]);
  }catch(err){
    return res.status(500).json(err);
  }

  res.redirect('http://localhost:3000/home');
});

app.get("/process_login", async (req, res) => {
  const query = "SELECT * FROM product WHERE id=?";
  try {
    const data = await pool.query(query, [req.params.id]);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on potr ${port}`);
});
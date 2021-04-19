const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fs = require('fs');

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
    database: dbInfo.pw,
    password: dbInfo.database,
  });

let sessionStore = new MySQLStore({}, pool);

const port = 3001;

app.use(cors());
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

app.get("/process_register", async (req, res) => {
  const query = "SELECT * FROM product WHERE id=?";
  try {
    const data = await pool.query(query, [req.params.id]);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
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

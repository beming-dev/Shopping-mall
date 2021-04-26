const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const fs = require("fs");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const e = require("express");

const dbInfo = JSON.parse(fs.readFileSync(__dirname + "/db.json", "UTF-8"));
const pool = mysql.createPool({
  host: dbInfo.host,
  user: dbInfo.user,
  database: dbInfo.database,
  password: dbInfo.pw,
});

let sessionStore = new MySQLStore({}, pool);

const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "asdfasffdsa",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.get("/api/shop", (req, res) => {});

app.post("/api/isLogined", (req, res) => {
  if (req.session.login == null) {
    res.send(false);
  } else {
    res.send(req.session.login);
  }
});

app.post("/api/loginInfo", async(req, res) => {
  let query = `select * from user where num=${req.session.loginID}`;
  try{
    const data = await pool.query(query);
    return res.json(data[0]);
  }catch(err){
    return res.status(500).json(err); 
  }
});

app.post("/api/orderList", async(req, res) => {
  const query = "select * from product where id = ?";
  
  try{
    const data = await pool.query(query, [req.body.id]);
    return res.send(data[0]);
  }catch(err){
    return res.status(500).json(err);
  }
});

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

app.post("/checkId", async (req, res) => {
  let id = req.body.id;

  let query = `select * from user where id = ?`;
  try {
    const data = await pool.query(query, [id]);
    if (!data[0][0]) {
      res.send({
        error: false,
      });
    } else {
      res.send({
        error: true,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/process_login", async (req, res) => {
  let { id, pw } = req.body;

  let query = `select * from user where id = ?`;
  try {
    const idData = await pool.query(query, [id]);
    if (!idData[0][0]) {
      res.send({
        login: false,
        message: "id ircorrect",
      });
    } else {
      crypto.pbkdf2(pw, idData[0][0].salt, 103011, 64, "sha512", (err, key) => {
        try {
          if (key.toString("base64") == idData[0][0].pw) {
            req.session.login = true;
            req.session.loginID = idData[0][0].num;
            res.send({
              login: true,
              message: "success",
            });
          } else {
            res.send({
              login: false,
              message: "pw ircorrect",
            });
          }
        } catch (err) {
          return res.status(500).json(err);
        }
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/process_logout", async (req, res) => {
  console.log("h");
  req.session.login = false;
  res.send(req.session.login);
});

app.post("/process_register", async (req, res) => {
  let { id, pw, email, birth } = req.body;

  let query = `insert into user value(null, ?, ?, ?, ?, ?)`;

  crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(
      pw,
      buf.toString("base64"),
      103011,
      64,
      "sha512",
      async (err, key) => {
        try {
          await pool.query(query, [
            id,
            key.toString("base64"),
            email,
            birth,
            buf.toString("base64"),
          ]);
          console.log("꺼억");
        } catch (err) {
          return res.status(500).json(err);
        }

        console.log(key.toString("base64"));
      }
    );
  });
  res.redirect("http://localhost:3000/home");
});

app.post("/process_update_info", async(req, res)=>{
  let { id, pw, email, birth } = req.body;
})

app.listen(port, () => {
  console.log(`Listening on potr ${port}`);
});

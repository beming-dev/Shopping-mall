const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const fs = require("fs");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const https = require("https");
const multer = require('multer');
const path = require('path');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

app.use(
  cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true })
)
 
// app.use(
//     cookieSession({
//       name: "__session",
//       keys: ["key1"],
//         maxAge: 24 * 60 * 60 * 100,
//         secure: true,
//         httpOnly: true,
//         sameSite: 'none'
//     })
// );

//multer
const upload = multer({
  storage:multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, '../front/public/images');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
    limits: {fileSize: 5 * 1024 * 1024}
  })
});

//https
const options = {
  key: fs.readFileSync("../front/localhost-key.pem"),
  cert: fs.readFileSync("../front/localhost.pem"),
};

//database
const dbInfo = JSON.parse(fs.readFileSync(__dirname + "/db.json", "UTF-8"));
const pool = mysql.createPool({
  host: dbInfo.host,
  user: dbInfo.user,
  database: dbInfo.database,
  password: dbInfo.pw,
});

//session
let sessionStore = new MySQLStore({}, pool);
app.use(
  session({
    secret: "asdfasffdsa",
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie:{
      maxAge:360000
    }
  })
);

//proxy, cors

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


//start
const port = 3001;

app.use("/admin", require("./routes/admin"));
app.use("/pay", require("./routes/pay"));
app.use("/api", require("./routes/api"));

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

app.post("/process_basket", async (req, res) => {
  const query = `insert into basket values(null, ${req.session.loginID}, ?, 1)`;
  try {
    await pool.query(query, [req.body.product_id]);
    res.json({
      result: true,
      login: req.session.login,
    });
  } catch (err) {
    res.json({
      result: false,
      login: req.session.login,
    });
  }
});

app.post("/process_logout", async (req, res) => {
  req.session.login = null;
  req.session.loginID = null;
  res.send(false);
});

app.post("/process_register", async (req, res) => {
  let { id, pw, email, birth } = req.body.data;

  let query = `insert into user value(null, ?, ?, ?, ?, ?, 0)`;

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
          res.json({"result": true});
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    );
  });
});

app.post("/process_update_info", async (req, res) => {
  let { id, pw, email, birth } = req.body;
});

app.post("/updateCount", async (req, res) => {
  let query = `update basket set count = ? where cart_id = ?`;

  try {
    pool.query(query, [req.body.count, req.body.id]);
    res.json({ success: true });
  } catch {
    return res.status(500).json(err);
  }
});

app.post("/seller-registration", async (req, res) => {
  let query = `update user set seller=1 where num=?`;
  try {
    pool.query(query, [req.session.loginId]);
  } catch {
    return res.status(500).json(err);
  }
});

app.post('/product-registration', upload.single('productImage'), (req, res) =>{
  const query = `insert into product values(null, ?, ?, ?, ?, ?)`
  try{
    pool.query(query, [req.body.productPrice, req.body.productName, req.body.productInformation, req.file.filename, req.session.loginID]);
    res.send(true);
  }catch(err){
    return res.status(500).json(err);
  }
});

https.createServer(options, app).listen(port, () => {
  console.log(`Listening on potr ${port}`);
});

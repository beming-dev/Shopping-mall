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
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const https = require("https");
const http = require("http");
const multer = require('multer');
const path = require('path');
const { pathToFileURL } = require("url");
const { default: axios } = require("axios");

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

const options = {
  key: fs.readFileSync("../front/localhost-key.pem"),
  cert: fs.readFileSync("../front/localhost.pem"),
};

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
  cookieParser(process.env.COOKIE_SECRET, { sameSite: "none", secure: true })
);

app.set("trust proxy", 1);
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
app.use(
  session({
    secret: "asdfasffdsa",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use("/admin", require("./routes/admin"));

app.get("/api/shop", (req, res) => {});

app.post("/api/isLogined", (req, res) => {
  if (req.session.login == null) {
    res.send(false);
  } else {
    res.send(req.session.login);
  }
});

app.post("/api/loginInfo", async (req, res) => {
  let query = `select * from user where num=${req.session.loginID}`;
  try {
    const data = await pool.query(query);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/api/itemInfo", async (req, res) => {
  const query = "select * from product where id = ?";

  try {
    const data = await pool.query(query, [req.body.id]);
    return res.send(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/api/basket", async (req, res) => {
  const query =
    "select * from basket left join product on basket.product_id=product.id where user_id=?";
  try {
    const data = await pool.query(query, [req.session.loginID]);
    res.send(data[0]);
  } catch (err) {
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
  req.session.login = false;
  req.session.loginID = null;
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
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    );
  });
  res.redirect("https://localhost:3000/home");
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
    console.log(2);
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

app.post('/payments/complete', async (req, res) => {
  try{
    const {imp_uid, merchant_uid} = req.body;
    
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: {"Content-Type": "application/json"},
      data:{
        imp_key: "0230696647475507",
        imp_secret: "bFHQ41I8g59U4MyuxZg6ziOpNzFw2E0dkI4oKMx0SGUWstqZtH62ZVrNv6jxKkL52QtMC1MvHHraaSaD"
      }
    });
    const {access_token} = getToken.data.response;

    const getPaymentData = await axios({
      url:`https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: {"Authorization": access_token}
    });

    const paymentData = getPaymentData.data.response;

    const order = await pool.query(
      `select * from orders where user_id=?`,
      [req.session.loginID]
    )

    console.log(order[0]);

  } catch(err){
    res.status(400).send(err);
  }
});

app.post("/process_before_pay", async(req, res) => {
  try{
    const query = `insert into orders values (null, ?, ?)`
    const result = pool.query(query, [req.session.loginID, req.body.amount]);
  }
  catch{
    return res.status(500).json(err);
  }
})

https.createServer(options, app).listen(port, () => {
  console.log(`Listening on potr ${port}`);
});

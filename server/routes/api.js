const express = require('express');
const router = express.Router();
const mysql = require("mysql2/promise");
const fs = require('fs');

//database
const dbInfo = JSON.parse(fs.readFileSync(__dirname + "../../db.json", "UTF-8"));
const pool = mysql.createPool({
  host: dbInfo.host,
  user: dbInfo.user,
  database: dbInfo.database,
  password: dbInfo.pw,
});

router.post("/isLogined", (req, res) => {
if (req.session.login == null) {
    res.send(false);
} else {
    res.send(req.session.login);
}
});

router.post("/loginInfo", async (req, res) => {
let query = `select * from user where num=${req.session.loginID}`;
try {
    const data = await pool.query(query);
    return res.json(data[0]);
} catch (err) {
    return res.status(500).json(err);
}
});

router.post("/itemInfo", async (req, res) => {
const query = "select * from product where id = ?";

try {
    const data = await pool.query(query, [req.body.id]);
    return res.send(data[0]);
} catch (err) {
    return res.status(500).json(err);
}
});

router.post("/basket", async (req, res) => {
const query =
    "select * from basket left join product on basket.product_id=product.id where user_id=?";
try {
    const data = await pool.query(query, [req.session.loginID]);
    res.send(data[0]);
} catch (err) {
    return res.status(500).json(err);
}
});

module.exports = router;
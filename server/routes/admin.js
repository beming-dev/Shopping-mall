const express = require('express');
const router = express.Router();
const fs = require("fs");
const mysql = require("mysql2/promise");

//database
const dbInfo = JSON.parse(fs.readFileSync(__dirname + "../../db.json", "UTF-8"));
const pool = mysql.createPool({
  host: dbInfo.host,
  user: dbInfo.user,
  database: dbInfo.database,
  password: dbInfo.pw,
});

const adminInfo = JSON.parse(fs.readFileSync(__dirname + "../../admin.json", "UTF-8"));

router.post("/login", (req, res) => {
    if(req.body.id === adminInfo.adminID && req.body.pw === adminInfo.adminPW){
        req.session.adminLogin = true;
        res.json({login:true});
    }else{
        res.json({login:false});
    }
});

router.post("/logout", (req, res) => {
    req.session.adminLogin = false;
});

router.post("/pay", async(req, res) => {
    const query = `
    select pay_id, id, image, name, product.price, count, pay.price  
    from pay 
    left join product on pay.product_id = product.id
    limit ${(req.body.page-1)*10}, 10`;
    try{
        let result = await pool.query(query);
        res.send(result[0]);
    }
    catch(err){
        return res.status(500).json(err);
    }
});

router.post("/payCount", async(req, res) => {
    try{
        let count = await pool.query("select count(*) from pay");
        res.json({"count":count[0][0]["count(*)"]});
    }catch(err){
        return res.status(500).json(err);
    }
});

router.post("/userCount", async(req, res) => {
    try{
        let count = await pool.query("select count(*) from user");
        res.json({"count":count[0][0]["count(*)"]});
    }catch(err){
        return res.status(500).json(err);
    }
});

router.post("/user", async(req, res) => {
    const query = "select num, id, email, birth from user";
    try{
        let result = await pool.query(query);
        res.send(result[0]);
    }
    catch(err){
        return res.status(500).json(err);
    }
});

router.post("/user/withdrawal", async(req, res) => {
    req.body.checkedUser.map((user_id) => {
        const query = `delete from user where num = ?`;
        try{
            pool.query(query, [user_id]);
            res.send(true);
        }catch(err){
            return res.status(500).json(err);
        }
    })
});

router.post("/user/sendMail", async(req, res) => {
    
})

module.exports = router;
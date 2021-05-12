const express = require('express');
const router = express.Router();
const { default: axios } = require("axios");
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

router.post('/complete', async (req, res) => {
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
  
      //price falsification verification
      const order = await pool.query(
        `select * from orders where user_id=? and merchant_uid=?`,
        [req.session.loginID, merchant_uid]
      )
        
      if(order[0][0].price === paymentData.amount){
        //payment complete
        req.body.merchant.map(async(item)=>{
          try{
            const query = `insert into pay value(null, ?, ?, ?, ?)`;
            await pool.query(query, [req.session.loginID, item.id, item.count, item.price*item.count]);
            res.json({status: "success", message: "pay success"});
          }catch(err){
            return res.status(500).json(err);
          }
        })
      }else{
        //forged payment attempts
        throw { status: "forgery", message: ""}
      }
  
    } catch(err){
      res.status(400).send(err);
    }
  });
  
  router.post("/process_before", async(req, res) => {
    try{
      const query = `insert into orders values (null, ?, ?, ?)`
      const result = pool.query(query, [req.session.loginID, req.body.amount, req.body.merchant_uid]);
    }
    catch(err){
      return res.status(500).json(err);
    }
  });

  module.exports = router;
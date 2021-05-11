const express = require('express');
const router = express.Router();
const fs = require("fs");

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

module.exports = router;
const express = require('express')
const router = express.Router();
const { login, signup, getdata, update, progressupdate } = require('./controller')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorizemid = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, No Token Provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Access denied, Invalid Token" });
    }
};

router.post("/login", login)
router.post("/signup", signup)
router.get("/getdata", authorizemid, getdata)
router.post("/setdata", authorizemid, update)
router.post("/update", authorizemid, progressupdate)
module.exports = router;
import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/doctor', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && userCookie.authority === "admin") {
        res.render('admin/doctor-management');
    } else {
        res.redirect('/');
    }
});

router.get('/nurse', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && userCookie.authority === "admin") {
        res.render('admin/nurse-management');
    } else {
        res.redirect('/');
    }
});

module.exports = router;
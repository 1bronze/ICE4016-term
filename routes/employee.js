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

router.get('/examination', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && userCookie.authority === "doctor") {
        res.render('employee/examination-management');
    } else {
        res.send("<script>alert('Only doctors can access here!'); window.location.replace('/');</script>");
    }
});

router.get('/treatment', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && userCookie.authority === "nurse") {
        res.render('employee/examination-management');
    } else {
        res.send("<script>alert('Only nurses can access here!'); window.location.replace('/');</script>");
    }
});

router.get('/patients', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && (userCookie.authority === "doctor" || userCookie.authority === "nurse")) {
        res.render('employee/patients-management');
    } else {
        res.redirect('/');
    }
});

module.exports = router;
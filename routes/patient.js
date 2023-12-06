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

router.get('/reservation', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && userCookie.authority === "patient") {
        res.render('patient/reservation-management', {
            username: userCookie.id,
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
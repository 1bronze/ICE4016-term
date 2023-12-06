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

router.get('/', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority) {
        if (userCookie.authority === "doctor" || userCookie.authority === "nurse") {
            res.render('employee/index', {
                username: userCookie.id,
            });
        } else {
            res.render(`${userCookie.authority}/index`, {
                username: userCookie.id,
            });
        }
    } else {
        res.render('login');
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

router.post('/', async (req, res) => {
    const vars = req.body;
    const admins = await selectSql.getAdmins();
    const doctors = await selectSql.getDoctors();
    const nurses = await selectSql.getNurses();
    const patients = await selectSql.getPatients();
    var whoAmI = "";
    let authority = "";
    let checkLogin = false;

    admins.map((admin) => {
        if (vars.id == admin.admin_id && vars.password === admin.password) {
            checkLogin = true;
            whoAmI = admin.admin_id;
            authority = "admin";
        }
    })

    doctors.map((doctor) => {
        if (vars.id == doctor.doctor_id && vars.password === doctor.password) {
            checkLogin = true;
            whoAmI = doctor.doctor_id;
            authority = "doctor";
        }
    })

    nurses.map((nurse) => {
        if (vars.id == nurse.nurse_id && vars.password === nurse.password) {
            checkLogin = true;
            whoAmI = nurse.nurse_id;
            authority = "nurse";
        }
    })

    patients.map((patient) => {
        if (vars.id == patient.patient_id && vars.password === patient.password) {
            checkLogin = true;
            whoAmI = patient.patient_id;
            authority = "patient";
        }
    })

    if (checkLogin) {
        res.cookie('user', JSON.stringify({ id: whoAmI, authority: authority }), {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

module.exports = router;
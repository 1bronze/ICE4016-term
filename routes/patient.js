import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql, createSql, updateSql, deleteSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/reservation', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const patient_id = userCookie.id;
    const reservations = await selectSql.getReservations(patient_id);

    if (userCookie.authority && userCookie.authority === "patient") {
        res.render('patient/reservation-management', {
            username: userCookie.id,
            reservations: reservations,
        });
    } else {
        res.redirect('/');
    }
});

router.get('/reservation/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const patient_id = userCookie.id;
    const reservations = await selectSql.getReservations(patient_id);

    if (userCookie.authority && userCookie.authority === "patient") {   
        try {
            res.render('patient/reservation-management-create', {
                username: userCookie.id,
                patient_id: patient_id,
                reservations: reservations,
            });
        } catch (e) {
            res.redirect('/patient/reservation');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/reservation/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const reservation_datetime = req.body.reservation_datetime;
    const patient_id = req.body.patient_id;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "patient") {
        try {
            await createSql.createReservation(reservation_datetime, patient_id, department_id);

            res.redirect('/patient/reservation');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot create this! \\nThe department may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/reservation/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const patient_id = userCookie.id;
    const reservations = await selectSql.getReservations(patient_id);
    const reservation_number = req.query.id;

    if (userCookie.authority && userCookie.authority === "patient") {    
        try {
            const reservationData = await selectSql.getReservation(reservation_number);
            res.render('patient/reservation-management-edit', {
                username: userCookie.id,
                reservations: reservations,
                reservationData: reservationData,
            });
        } catch (e) {
            res.redirect('/patient/reservation');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/reservation/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const reservation_number = req.body.reservation_number;
    const reservation_datetime = req.body.reservation_datetime;
    const patient_id = req.body.patient_id;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "patient") {
        try {
            await updateSql.updateReservation(reservation_datetime, patient_id, department_id, reservation_number);

            res.redirect('/patient/reservation');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot edit this! \\nThe department may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/reservation/delete', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const reservation_number = req.query.id;

    if (userCookie.authority && userCookie.authority === "patient") {
        if (reservation_number) {
            try {
                await deleteSql.deleteReservation(reservation_number);
                res.redirect('/patient/reservation');
            } catch (e) {
                res.send(`
                    <script>
                        alert('Cannot delete this!');
                        window.history.back();
                    </script>
                `);
            }
        } else {
            res.redirect('/');
        }
    }
})

module.exports = router;
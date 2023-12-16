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

router.get('/examination', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctor_id = userCookie.id;
    const examinations = await selectSql.getExaminations(doctor_id);

    if (userCookie.authority && userCookie.authority === "doctor") {
        res.render('employee/examination-management', {
            username: userCookie.id,
            doctor_id: doctor_id,
            examinations: examinations,

        });
    } else {
        res.send("<script>alert('Only doctors can access here!'); window.location.replace('/');</script>");
    }
});

router.get('/examination/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctor_id = userCookie.id;
    const examinations = await selectSql.getExaminations(doctor_id);

    if (userCookie.authority && userCookie.authority === "doctor") {   
        try {
            res.render('employee/examination-management-create', {
                username: userCookie.id,
                doctor_id: doctor_id,
                examinations: examinations,
            });
        } catch (e) {
            res.redirect('/employee/examination');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/examination/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const examination_datetime = req.body.examination_datetime;
    const examination_details = req.body.examination_details;
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;

    if (userCookie.authority && userCookie.authority === "doctor") {
        try {
            await createSql.createExamination(examination_datetime, examination_details, doctor_id, patient_id);

            res.redirect('/employee/examination');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot create this! \\nThe patient may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/examination/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctor_id = userCookie.id;
    const examinations = await selectSql.getExaminations(doctor_id);
    const examination_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "doctor") {    
        try {
            const examinationData = await selectSql.getExamination(examination_id);
            res.render('employee/examination-management-edit', {
                username: userCookie.id,
                examinations: examinations,
                examinationData: examinationData,
            });
        } catch (e) {
            res.redirect('/employee/examination');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/examination/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const examination_id = req.body.examination_id;
    const examination_datetime = req.body.examination_datetime;
    const examination_details = req.body.examination_details;
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id;

    if (userCookie.authority && userCookie.authority === "doctor") {
        try {
            await updateSql.updateExamination(examination_datetime, examination_details, doctor_id, patient_id, examination_id);

            res.redirect('/employee/examination');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot edit this! \\nThe patient may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/examination/delete', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const examination_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "doctor") {
        if (examination_id) {
            try {
                await deleteSql.deleteExamination(examination_id);
                res.redirect('/employee/examination');
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

router.get('/treatment', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurse_id = userCookie.id;
    const treatments = await selectSql.getTreatments(nurse_id);

    if (userCookie.authority && userCookie.authority === "nurse") {
        res.render('employee/treatment-management', {
            username: userCookie.id,
            nurse_id: nurse_id,
            treatments: treatments,
        });
    } else {
        res.send("<script>alert('Only nurses can access here!'); window.location.replace('/');</script>");
    }
});


router.get('/treatment/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurse_id = userCookie.id;
    const treatments = await selectSql.getTreatments(nurse_id);

    if (userCookie.authority && userCookie.authority === "nurse") {    
        try {
            res.render('employee/treatment-management-create', {
                username: userCookie.id,
                nurse_id: nurse_id,
                treatments: treatments,
            });
        } catch (e) {
            res.redirect('/employee/treatment');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/treatment/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const treatment_datetime = req.body.treatment_datetime;
    const treatment_details = req.body.treatment_details;
    const nurse_id = req.body.nurse_id;
    const patient_id = req.body.patient_id;

    if (userCookie.authority && userCookie.authority === "nurse") {
        try {
            await createSql.createTreatment(treatment_datetime, treatment_details, nurse_id, patient_id);

            res.redirect('/employee/treatment');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot create this! \\nThe patient may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/treatment/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurse_id = userCookie.id;
    const treatments = await selectSql.getTreatments(nurse_id);
    const treatment_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "nurse") {    
        try {
            const treatmentData = await selectSql.getTreatment(treatment_id);
            res.render('employee/treatment-management-edit', {
                username: userCookie.id,
                treatments: treatments,
                treatmentData: treatmentData,
            });
        } catch (e) {
            res.redirect('/employee/treatment');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/treatment/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const treatment_id = req.body.treatment_id;
    const treatment_datetime = req.body.treatment_datetime;
    const treatment_details = req.body.treatment_details;
    const nurse_id = req.body.nurse_id;
    const patient_id = req.body.patient_id;

    if (userCookie.authority && userCookie.authority === "nurse") {
        try {
            await updateSql.updateTreatment(treatment_datetime, treatment_details, nurse_id, patient_id, treatment_id);

            res.redirect('/employee/treatment');
        } catch (e) {
            res.send(`
                <script>
                    alert('Cannot edit this! \\nThe patient may not exists.');
                    window.history.back();
                </script>
            `);
        }
    } else {
        res.redirect('/');
    }
})

router.get('/treatment/delete', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const treatment_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "nurse") {
        if (treatment_id) {
            try {
                await deleteSql.deleteTreatment(treatment_id);
                res.redirect('/employee/treatment');
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

router.get('/patients', (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    if (userCookie.authority && (userCookie.authority === "doctor" || userCookie.authority === "nurse")) {
        res.render('employee/patients-management', {
            username: userCookie.id,
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
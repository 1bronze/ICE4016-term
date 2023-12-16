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

router.get('/doctor', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctors = await selectSql.getDoctors();

    if (userCookie.authority && userCookie.authority === "admin") {
        res.render('admin/doctor-management', {
            username: userCookie.id,
            doctors: doctors,
        });
    } else {
        res.redirect('/');
    }
});

router.get('/doctor/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctors = await selectSql.getDoctors();

    if (userCookie.authority && userCookie.authority === "admin") {    
        try {
            res.render('admin/doctor-management-create', {
                username: userCookie.id,
                doctors: doctors,
            });
        } catch (e) {
            res.redirect('/admin/doctor');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/doctor/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const doctor_id = req.body.doctor_id;
    const name = req.body.name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "admin") {
        try {
            await createSql.createDoctor(doctor_id, name, address, phone_number, password, department_id);

            res.redirect('/admin/doctor');
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

router.get('/doctor/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctors = await selectSql.getDoctors();
    const doctor_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "admin") {    
        try {
            const doctorData = await selectSql.getDoctor(doctor_id);
            res.render('admin/doctor-management-edit', {
                username: userCookie.id,
                doctors: doctors,
                doctorData: doctorData,
            });
        } catch (e) {
            res.redirect('/admin/doctor');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/doctor/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const doctor_id = req.body.doctor_id;
    const name = req.body.name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "admin") {
        try {
            await updateSql.updateDoctor(name, address, phone_number, department_id, doctor_id);

            res.redirect('/admin/doctor');
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

router.get('/doctor/delete', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const doctor_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "admin") {
        if (doctor_id) {
            try {
                await deleteSql.deleteDoctor(doctor_id);
                res.redirect('/admin/doctor');
            } catch (e) {
                res.send(`
                    <script>
                        alert('Cannot delete this! \\nThe doctor may have patients to care.');
                        window.history.back();
                    </script>
                `);
            }
        } else {
            res.redirect('/');
        }
    }
})

router.get('/nurse', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurses = await selectSql.getNurses();

    if (userCookie.authority && userCookie.authority === "admin") {
        res.render('admin/nurse-management', {
            username: userCookie.id,
            nurses: nurses,
        });
    } else {
        res.redirect('/');
    }
});

router.get('/nurse/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurses = await selectSql.getNurses();

    if (userCookie.authority && userCookie.authority === "admin") {    
        try {
            res.render('admin/nurse-management-create', {
                username: userCookie.id,
                nurses: nurses,
            });
        } catch (e) {
            res.redirect('/admin/nurse');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/nurse/create', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const nurse_id = req.body.nurse_id;
    const name = req.body.name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "admin") {
        try {
            await createSql.createNurse(nurse_id, name, address, phone_number, password, department_id);

            res.redirect('/admin/nurse');
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

router.get('/nurse/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurses = await selectSql.getNurses();
    const nurse_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "admin") {    
        try {
            const nurseData = await selectSql.getNurse(nurse_id);
            res.render('admin/nurse-management-edit', {
                username: userCookie.id,
                nurses: nurses,
                nurseData: nurseData,
            });
        } catch (e) {
            res.redirect('/admin/nurse');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/nurse/update', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');

    const nurse_id = req.body.nurse_id;
    const name = req.body.name;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const department_id = req.body.department_id;

    if (userCookie.authority && userCookie.authority === "admin") {
        try {
            await updateSql.updateNurse(name, address, phone_number, department_id, nurse_id);
            const nurses = await selectSql.getNurses();

            res.redirect('/admin/nurse');
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

router.get('/nurse/delete', async (req, res) => {
    const userCookie = JSON.parse(req.cookies.user || '{}');
    const nurse_id = req.query.id;

    if (userCookie.authority && userCookie.authority === "admin") {
        if (nurse_id) {
            try {
                await deleteSql.deleteNurse(nurse_id);
                res.redirect('/admin/nurse');
            } catch (e) {
                res.send(`
                    <script>
                        alert('Cannot delete this! \\nThe nurse may have patients to care.');
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
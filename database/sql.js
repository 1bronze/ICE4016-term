import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: '127.0.0.1',
    user: 'root',
    database: 'inha_hospital',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

const promisePool = pool.promise();

export const selectSql = {
  getAdmins: async () => {
    const [rows] = await promisePool.query(`select * from admin`);
    return rows;
  },
  getDoctors: async () => {
    const [rows] = await promisePool.query(`select * from doctor`);
    return rows;
  },
  getDoctor: async (doctor_id) => {
    const query = `SELECT * FROM doctor WHERE doctor_id = ?`;
    const [rows] = await promisePool.query(query, [doctor_id]);
    return rows[0];
  },
  getNurses: async () => {
    const [rows] = await promisePool.query(`select * from nurse`);
    return rows;
  },
  getNurse: async (nurse_id) => {
    const query = `SELECT * FROM nurse WHERE nurse_id = ?`;
    const [rows] = await promisePool.query(query, [nurse_id]);
    return rows[0];
  },
  getPatients: async () => {
    const [rows] = await promisePool.query(`select * from patient`);
    return rows;
  },
  
  getExaminations: async (doctor_id) => {
    const query = `select * from examination WHERE doctor_id = ?`;
    const [rows] = await promisePool.query(query, [doctor_id]);
    return rows;
  },
  getTreatments: async (nurse_id) => {
    const query = `select * from treatment WHERE nurse_id = ?`;
    const [rows] = await promisePool.query(query, [nurse_id]);
    return rows;
  },
  getExamination: async (examination_id) => {
    const query = `select * from examination WHERE examination_id = ?`;
    const [rows] = await promisePool.query(query, [examination_id]);
    return rows[0];
  },
  getTreatment: async (treatment_id) => {
    const query = `select * from treatment WHERE treatment_id = ?`;
    const [rows] = await promisePool.query(query, [treatment_id]);
    return rows[0];
  },
}

export const createSql = {
  createDoctor: async (doctor_id, name, address, phone_number, password, department_id) => {
    const query = `
        INSERT INTO inha_hospital.doctor (doctor_id, name, address, phone_number, password, department_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [doctor_id, name, address, phone_number, password, department_id];
    await promisePool.query(query, values);
  },
  createNurse: async (nurse_id, name, address, phone_number, password, department_id) => {
    const query = `
        INSERT INTO inha_hospital.nurse (nurse_id, name, address, phone_number, password, department_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nurse_id, name, address, phone_number, password, department_id];
    await promisePool.query(query, values);
  },

  createExamination: async (examination_datetime, examination_details, doctor_id, patient_id) => {
    const query = `
        INSERT INTO inha_hospital.examination (examination_datetime, examination_details, doctor_id, patient_id)
        VALUES (?, ?, ?, ?)
    `;
    const values = [examination_datetime, examination_details, doctor_id, patient_id];
    await promisePool.query(query, values);
  },
  createTreatment: async (treatment_datetime, treatment_details, nurse_id, patient_id) => {
    const query = `
        INSERT INTO inha_hospital.treatment (treatment_datetime, treatment_details, nurse_id, patient_id)
        VALUES (?, ?, ?, ?)
    `;
    const values = [treatment_datetime, treatment_details, nurse_id, patient_id];
    await promisePool.query(query, values);
  },
}

export const updateSql = {
  updateDoctor: async (name, address, phone_number, department_id, doctor_id) => {
    const query = `
        UPDATE doctor 
        SET name = ?, address = ?, phone_number = ?, department_id = ? 
        WHERE doctor_id = ?
    `;
    const values = [name, address, phone_number, department_id, doctor_id];
    await promisePool.query(query, values);
  },
  updateNurse: async (name, address, phone_number, department_id, nurse_id) => {
    const query = `
        UPDATE nurse 
        SET name = ?, address = ?, phone_number = ?, department_id = ? 
        WHERE nurse_id = ?
    `;
    const values = [name, address, phone_number, department_id, nurse_id];
    await promisePool.query(query, values);
  },

  updateExamination: async (examination_datetime, examination_details, doctor_id, patient_id, examination_id) => {
    const query = `
        UPDATE examination
        SET examination_datetime = ?, examination_details = ?, doctor_id = ?, patient_id = ?
        WHERE examination_id = ?
    `;
    const values = [examination_datetime, examination_details, doctor_id, patient_id, examination_id];
    await promisePool.query(query, values);
  },
  updateTreatment: async (treatment_datetime, treatment_details, nurse_id, patient_id, treatment_id) => {
    const query = `
        UPDATE treatment
        SET treatment_datetime = ?, treatment_details = ?, nurse_id = ?, patient_id = ?
        WHERE treatment_id = ?
    `;
    const values = [treatment_datetime, treatment_details, nurse_id, patient_id, treatment_id];
    await promisePool.query(query, values);
  },
}

export const deleteSql = {
  deleteDoctor: async (doctor_id) => {
    const query = `DELETE FROM doctor WHERE doctor_id = ?`;
    await promisePool.query(query, [doctor_id]);
  },
  deleteNurse: async (nurse_id) => {
    const query = `DELETE FROM nurse WHERE nurse_id = ?`;
    await promisePool.query(query, [nurse_id]);
  },

  deleteExamination: async (examination_id) => {
    const query = `DELETE FROM examination WHERE examination_id = ?`;
    await promisePool.query(query, [examination_id]);
  },
  deleteTreatment: async (treatment_id) => {
    const query = `DELETE FROM treatment WHERE treatment_id = ?`;
    await promisePool.query(query, [treatment_id]);
  }
}
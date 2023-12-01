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
  getNurses: async () => {
    const [rows] = await promisePool.query(`select * from nurse`);
    return rows;
  },
  getPatients: async () => {
    const [rows] = await promisePool.query(`select * from patient`);
    return rows;
  },
}

export const createSql = {
//   addClass: async (data) => {
//     const uid = await promisePool.query(`select Id from Student where StudentId=${data.sId}`);
//     console.log(uid);
//     const results = await promisePool.query (
//       `insert into class_student values (${uid[0][0].Id}, ${data.cId});`
//     )
//     return results[0];
//   }
}
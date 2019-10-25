require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
let dbConfig = {};

switch (process.env.ENVIRONMENT) {
  case 'development':
  case 'test':
    const fs = require('fs');
    const privateKey = fs.readFileSync(__dirname + '/client-key.pem', "utf8");
    const certificate = fs.readFileSync(__dirname + '/client-cert.pem', "utf8");
    const ca = fs.readFileSync(__dirname + '/server-ca.pem', "utf8");
    dbConfig = {
      connectionLimit: 10,
      host: process.env.HOST_CLOUD,
      port: process.env.PORT_CLOUD,
      database: process.env.DB_CLOUD,
      user: process.env.USER_CLOUD,
      password: process.env.PASSWORD_CLOUD,
      ssl: {
        key: privateKey,
        cert: certificate,
        ca: ca
      }
    };
    break;
  case 'production':
    dbConfig = {
      connectionLimit: 10,
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      database: process.env.DB,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD
    };
    break;
}

const pool = mysql.createPool(dbConfig);

exports.getConnection = (cb) => {
  pool.getConnection(function (err, connection) {
    if(err) {
      return cb(err);
    }
    cb(null, connection);
  });
};

pool.query = util.promisify(pool.query);
pool.getConnection = util.promisify(pool.getConnection);

module.exports = pool;

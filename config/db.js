require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
let dbConfig = {};

switch (process.env.ENVIRONMENT) {
  case 'development':
  case 'test':
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

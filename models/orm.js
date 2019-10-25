const pool = require('../config/db');

exports.find = (table, columnArray, lookupArray, payloadArray, orderBy, limit) => {
  const query = `SELECT ${ columnArray.join(' ') } FROM ${ table } WHERE `;
  return pool.query(
    generateQuery(query, lookupArray, orderBy, limit),
    payloadArray
  );
};

exports.createOne = (table, payloadArray) => {
  const query = `INSERT INTO ${ table } SET ?`;
  return pool.query(query, payloadArray);
};

exports.updateOne = (table, lookupArray, payloadArray) => {
  const query = `UPDATE ${ table } SET ? WHERE `;
  return pool.query(
    generateQuery(query, lookupArray),
    payloadArray
  );
};

exports.deleteOne = (table, lookupArray, payloadArray) => {
  const query = `DELETE FROM ${ table } WHERE `;
  return pool.query(
    generateQuery(query, lookupArray),
    payloadArray
  );
};

const generateQuery = (query, lookupArray, orderBy = null, limit = null) => {
  lookupArray.forEach((column, index) => {
    if ((lookupArray.length - 1) !== index)
      query += `${column} = ? AND `;
    else
      query += `${column} = ?`;
  });

  if (orderBy) {
    query += ` ORDER BY ${ orderBy }`
  }

  if (limit) {
    query += ` LIMIT ${ limit }`
  }
  console.log(query);
  return query;
};

/* Transactions */

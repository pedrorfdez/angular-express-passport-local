const mysql = require('mysql');

const { database } = require('./keys')

const pool = mysql.createPool(database);

pool.getConnection(function(err, connection) {
    if (err) throw err;
    if (connection) {
        connection.release();
    }
    console.log('Connected to database');
});

module.exports = pool;
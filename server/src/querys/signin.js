const pool = require('../database')

exports.signIn = async function(username, password, callback) {
    await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, users, fields) {
        if (err) throw err;
        callback(null, (users.length == 1) ? users[0] : false)
    });
}
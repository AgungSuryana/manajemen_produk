const db = require('../config/db'); 


exports.createUser = (userData, callback) => {
    const { username, password, role } = userData;
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

    db.query(query, [username, password, role], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

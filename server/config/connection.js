const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.DB_CONNECTION, (err, db) => {
    if (err) console.log(err);
    if (db) console.log('connected successfully!');
})
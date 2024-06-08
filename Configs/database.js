const mongoose = require('mongoose')

console.log(process.env.MONGODB_URL)
//BUILD A CONNECTION
mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.DATABASE_NAME,
}).then(() => {
    console.log('Database connection established')
}).catch(err => console.log('error', err));

//REPLACE MONGOOSE PROMISE BY BLUEBIRD
mongoose.Promise = require('bluebird');
module.exports.mongoose = mongoose

const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGOURL)
    .then(() => console.log('MongoDB Connected!')).catch((error) => console.log(error))

    // "mongodb+srv://anbukumar1913:b62g2nlPG5aHByKv@collection.xfyzh.mongodb.net/userCollection"
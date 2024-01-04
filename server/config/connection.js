//importing our mongoose connection
const mongoose = require('mongoose');

//invoke our connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/manifest-mastery',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const connection = mongoose.connection;

module.exports = connection;
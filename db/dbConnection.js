const mongoose = require('mongoose')
const dbConnection = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("Error while connecting DB", error);
    }
};

module.exports = { dbConnection };
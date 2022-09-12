const mongoose = require("mongoose");
require('dotenv').config()

const connectWithDb = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
};

module.exports = {connectWithDb};
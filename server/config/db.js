const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    ("Connected to MongoDB");
});

db.on("close", () => {
    ("MongoDB connection closed");
});

module.exports = mongoose;

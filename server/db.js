const mongoose = require("mongoose");
const fs = require("fs");

const dbUrl = JSON.parse(fs.readFileSync("./secret/secret.json")).dburl;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

db.on("close", () => {
    console.log("MongoDB connection closed");
});

module.exports = mongoose;

const mongoose = require("mongoose");
const dbUrl =
    "mongodb+srv://user02:h6GzOzxJa3c9fGtL@restaurant-ordering-sys.wiy8h0z.mongodb.net/";

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

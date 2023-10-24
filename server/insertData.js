// For testing purposes only

const mongoose = require("mongoose");

const dbUrl =
    "mongodb+srv://user02:h6GzOzxJa3c9fGtL@restaurant-ordering-sys.wiy8h0z.mongodb.net/";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    filter: [String],
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    diet: [String],
});

const menuSchema = new mongoose.Schema({
    totalItemCount: {
        type: Number,
        required: true,
    },
    menuList: [menuItemSchema],
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// Create a model based on the schema
const Menu = mongoose.model("Menu", menuSchema);

// Insert the provided data into the collection
const newMenu = new Menu({
    totalItemCount: 1,
    menuList: [
        {
            id: "nacho-chips",
            image: "test/nacho-chips.png",
            filter: ["Lunch", "Supper"],
            name: "Nacho Chips",
            price: 9.99,
            description: "Our Nacho Chips are made fresh daily.",
            diet: ["Spicy", "Vegan"],
        },
    ],
});

newMenu
    .save()
    .then(() => {
        console.log("Data inserted into the collection");
        mongoose.connection.close(); // Close the MongoDB connection
    })
    .catch((error) => {
        console.error("Error inserting data:", error);
    });

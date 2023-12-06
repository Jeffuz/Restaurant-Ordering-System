// For testing purposes only

const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    menuId: {
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

// // Insert new restaurant
// const newMenu = new Menu({
//     totalItemCount: 1,
//     menuList: [
//         {
//             menuId: "nacho-chips",
//             image: "test/nacho-chips.png",
//             filter: ["Lunch", "Supper"],
//             name: "Nacho Chips",
//             price: 9.99,
//             description: "Our Nacho Chips are made fresh daily.",
//             diet: ["Spicy", "Vegan"],
//         },
//     ],
// });

// newMenu
//     .save()
//     .then(() => {
//         ("Data inserted into the collection");
//         mongoose.connection.close(); // Close the MongoDB connection
//     })
//     .catch((error) => {
//         console.error("Error inserting data:", error);
//     });

// Insert menu item
const newMenuItem = new MenuItem({
    menuId: "nacho-chips2",
    image: "test/nacho-chips.png",
    filter: ["Lunch", "Supper"],
    name: "Nacho Chips2",
    price: 9.99,
    description: "Our Nacho Chips are made fresh daily.",
    diet: ["Spicy", "Vegan"],
});

Menu.findById("65381ed4030fa645be95b250").then((menu) => {
    menu.menuList.push(newMenuItem);
    menu.totalItemCount++;

    menu.save().then(() => {
        ("Data inserted into the collection");
        mongoose.connection.close(); // Close the MongoDB connection
    });
});

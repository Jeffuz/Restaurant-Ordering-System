// For testing purposes only
require("dotenv").config();

const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const dbUrl = process.env.DB_URL;

console.log(dbUrl);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const newRestaurant = new Restaurant({
    restaurantName: "Test Restaurant",
    restaurantMenu: {
        totalItemCount: 1,
        menuList: [
            {
                menuId: "nacho-chips",
                image: "test/nacho-chips.png",
                filter: ["Lunch", "Supper"],
                name: "Nacho Chips",
                price: 9.99,
                description: "Our Nacho Chips are made fresh daily.",
                diet: ["Spicy", "Vegan"],
                customizable: false,
            },
        ],
    },
    table: {
        totalTableCount: 1,
        tableList: [
            {
                tableNumber: "1",
                seatCapacity: 4,
                isOccupied: false,
                order: [],
            },
        ],
    },
    history: [],
});

newRestaurant.save().then(() => {
    console.log("Data inserted into the collection");
    mongoose.connection.close(); // Close the MongoDB connection
});

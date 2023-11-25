const Restaurant = require("../models/restaurantModel");
const Table = require("../models/tableModel");

function getRestaurant(ws, message) {
    const restaurantId = message.restaurantId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const response = { restaurant: restaurant };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while retrieving restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function createRestaurant(ws, message) {
    const restaurantName = message.restaurantName;

    const newTable = new Table({
        totalTableCount: 0,
        tableList: [],
    });

    const newRestaurant = new Restaurant({
        restaurantName: restaurantName,
        restaurantMenu: null,
        table: newTable,
        history: [],
    });

    newRestaurant
        .save()
        .then((restaurant) => {
            const response = { restaurant: restaurant };
            ws.send(JSON.stringify(response));
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while creating restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function updateRestaurantName(ws, message) {
    const restaurantId = message.restaurantId;
    const restaurantName = message.restaurantName;

    Restaurant.findByIdAndUpdate(
        restaurantId,
        { restaurantName: restaurantName },
        { new: true }
    )
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const response = { restaurant: restaurant };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while updating restaurant name",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function deleteRestaurant(ws, message) {
    const restaurantId = message.restaurantId;

    Restaurant.findByIdAndDelete(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const response = { restaurant: restaurant };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while deleting restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

module.exports = {
    getRestaurant,
    createRestaurant,
    updateRestaurantName,
    deleteRestaurant,
};

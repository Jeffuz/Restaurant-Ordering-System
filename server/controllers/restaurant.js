const Restaurant = require("../models/restaurantModel");
const { Table, TableItem, OrderItem } = require("../models/tableModel");
const { Menu, MenuItem, MenuCustom } = require("../models/menuModel");

function getRestaurant(message) {
    const restaurantId = message.restaurantId;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    resolve({
                        action: "GETRESTAURANT",
                        restaurant: restaurant,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error while retrieving restaurant",
                    detail: err,
                });
            });
    });
}

function createRestaurant(message) {
    const restaurantName = message.restaurantName;

    const emptyMenu = new Menu({
        totalItemCount: 0,
        menuList: [],
    });

    const emptyTable = new Table({
        totalTableCount: 0,
        tableList: [],
    });

    const newRestaurant = new Restaurant({
        restaurantName: restaurantName,
        restaurantMenu: emptyMenu,
        table: emptyTable,
        history: [],
    });

    return new Promise((resolve, reject) => {
        newRestaurant
            .save()
            .then((restaurant) => {
                resolve({ action: "CREATERESTAURANT", restaurant: restaurant });
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error while creating restaurant",
                    detail: err,
                });
            });
    });
}

function updateRestaurantName(message) {
    const restaurantId = message.restaurantId;
    const restaurantName = message.restaurantName;

    Restaurant.findByIdAndUpdate(
        restaurantId,
        { restaurantName: restaurantName },
        { new: true }
    )
        .then((restaurant) => {
            if (!restaurant) {
                reject({ error: "Restaurant not found" });
            } else {
                resolve({
                    action: "UPDATERESTAURANTNAME",
                    restaurant: restaurant,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            reject({
                error: "Error while updating restaurant name",
                detail: err,
            });
        });
}

function deleteRestaurant(message) {
    const restaurantId = message.restaurantId;

    Restaurant.findByIdAndDelete(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                reject({ error: "Restaurant not found" });
            } else {
                resolve({ action: "DELETERESTAURANT", restaurant: restaurant });
            }
        })
        .catch((err) => {
            console.log(err);
            reject({
                error: "Error while deleting restaurant",
                detail: err,
            });
        });
}

module.exports = {
    getRestaurant,
    createRestaurant,
    updateRestaurantName,
    deleteRestaurant,
};

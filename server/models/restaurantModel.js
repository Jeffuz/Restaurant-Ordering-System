const mongoose = require("../config/db");

const { Menu, MenuItem, MenuCustom } = require("./menuModel");
const Table = require("./tableModel");
const OrderHistory = require("./orderHistoryModel");

const restaurantSchema = new mongoose.Schema({
    restaurantName: String,
    restaurantMenu: Menu.schema,
    table: Table.schema,
    history: [{ usrID: String, userHistory: [OrderHistory.schema] }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

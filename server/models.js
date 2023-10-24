// const mongoose = require("mongoose");

const mongoose = require("./db");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const menuSchema = new mongoose.Schema({
    totalItemCount: {
        type: Number,
        required: true,
    },
    menuList: [menuItemSchema],
});

const menuSchemaString = new mongoose.Schema({
    totalItemCount: {
        type: Number,
        required: true,
    },
    menuList: [String],
});

const Menu = mongoose.model("Menu", menuSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
const MenuString = mongoose.model("MenuString", menuSchemaString);

module.exports = { Menu, MenuItem, MenuString };

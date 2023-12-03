const mongoose = require("../config/db");

const menuCustomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    multipleSelection: {
        type: Boolean,
        required: true,
    },
    option: {
        type: [{ customName: String, price: Number }],
        required: true,
    },
});

const menuItemSchema = new mongoose.Schema({
    menuId: {
        type: String,
        required: true,
        unique: true
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
    customizable: {
        type: Boolean,
        required: true,
    },
    custom: {
        type: [menuCustomSchema],
    },
});

const menuSchema = new mongoose.Schema({
    totalItemCount: {
        type: Number,
        required: true,
    },
    menuList: [menuItemSchema],
});

const MenuCustom = mongoose.model("menuCustom", menuCustomSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
const Menu = mongoose.model("Menu", menuSchema);
MenuItem.init();

module.exports = { Menu, MenuItem, MenuCustom };

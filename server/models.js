const mongoose = require("./db");

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

const Menu = mongoose.model("Menu", menuSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = { Menu, MenuItem };

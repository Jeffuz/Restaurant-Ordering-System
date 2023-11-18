const mongoose = require("../config/db");

const orderSchema = mongoose.Schema({
    menuItemId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    custom: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const tableItemSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true,
    },
    seatCapacity: {
        type: Number,
        required: true,
    },
    isOccupied: {
        type: Boolean,
        required: true,
    },
    order: {
        type: [orderSchema],
    },
});

const tableSchema = new mongoose.Schema({
    totalTableCount: {
        type: Number,
        required: true,
    },
    tableList: [tableItemSchema],
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;

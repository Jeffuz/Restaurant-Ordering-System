const mongoose = require("../config/db");

const orderItemSchema = mongoose.Schema({
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
    seatCapacity: {
        type: Number,
        required: true,
    },
    isOccupied: {
        type: Boolean,
        required: true,
    },
    order: {
        type: [orderItemSchema],
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
const TableItem = mongoose.model("TableItem", tableItemSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = { Table, TableItem, OrderItem };

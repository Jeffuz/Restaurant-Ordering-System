const mongoose = require("../config/db");

const orderHistorySchema = new mongoose.Schema({
    menuItemID: {
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
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;

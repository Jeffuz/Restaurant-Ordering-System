const mongoose = require("../config/db");

const orderHistorySchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true, // Add createdAt and updatedAt timestamps
    }
);

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;

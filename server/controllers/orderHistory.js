const OrderHistory = require("../models/orderHistoryModel");
const Restaurant = require("../models/restaurantModel");

function getOrderHistory(ws, message) {
    const restaurantId = message.restaurantId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = {
                    error: "Restaurant not found",
                };
                ws.send(JSON.stringify(response));
            } else {
                const response = {
                    orderHistory: restaurant.history,
                };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error finidng restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function createOrderHistory(ws, message) {
    const restaurantId = message.restaurantId;
    const { usrId, menuItemId, quantity, custom, price } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = {
                    error: "Restaurant not found",
                };
                ws.send(JSON.stringify(response));
            } else {
                const newOrderHistory = new OrderHistory({
                    usrId,
                    menuItemId,
                    quantity,
                    custom,
                    price,
                });

                const historyIndex = restaurant.history.findIndex(
                    (history) => history.usrId == usrId
                );

                if (historyIndex == -1) {
                    restaurant.history.push({
                        usrId,
                        userHistory: [newOrderHistory],
                    });
                } else {
                    restaurant.history[historyIndex].userHistory.push(
                        newOrderHistory
                    );
                }

                restaurant
                    .save()
                    .then((restaurant) => {
                        const response = {
                            orderHistory: restaurant.history,
                        };
                        ws.send(JSON.stringify(response));
                    })
                    .catch((err) => {
                        console.log(err);
                        const response = {
                            error: "Error while saving restaurant",
                            detail: err,
                        };
                        ws.send(JSON.stringify(response));
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error finding restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function updateOrderHistory(ws, message) {
    const restaurantId = message.restaurantId;
    const { usrId, orderHistoryId } = message;
    const { menuItemId, quantity, custom, price } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = {
                    error: "Restaurant not found",
                };
                ws.send(JSON.stringify(response));
            } else {
                const historyIndex = restaurant.history.findIndex(
                    (history) => history.usrId == usrId
                );

                if (historyIndex == -1) {
                    const response = {
                        error: "User not found in history",
                    };
                    ws.send(JSON.stringify(response));
                } else {
                    const orderHistoryIndex = restaurant.history[
                        historyIndex
                    ].userHistory.findIndex(
                        (orderHistory) => orderHistory._id == orderHistoryId
                    );

                    if (orderHistoryIndex == -1) {
                        const response = {
                            error: "Order history not found",
                        };
                        ws.send(JSON.stringify(response));
                    } else {
                        const orderHistory =
                            restaurant.history[historyIndex].userHistory[
                                orderHistoryIndex
                            ];

                        if (menuItemId) orderHistory.menuItemId = menuItemId;
                        if (quantity) orderHistory.quantity = quantity;
                        if (custom) orderHistory.custom = custom;
                        if (price) orderHistory.price = price;

                        restaurant
                            .save()
                            .then((restaurant) => {
                                const response = {
                                    orderHistory:
                                        restaurant.history[historyIndex],
                                };
                                ws.send(JSON.stringify(response));
                            })
                            .catch((err) => {
                                console.log(err);
                                const response = {
                                    error: "Error while saving restaurant",
                                    detail: err,
                                };
                                ws.send(JSON.stringify(response));
                            });
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error finding restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function deleteOrderHistory(ws, message) {
    const restaurantId = message.restaurantId;
    const { usrId, orderHistoryId } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = {
                    error: "Restaurant not found",
                };
                ws.send(JSON.stringify(response));
            } else {
                const historyIndex = restaurant.history.findIndex(
                    (history) => history.usrId == usrId
                );

                if (historyIndex == -1) {
                    const response = {
                        error: "User not found in history",
                    };
                    ws.send(JSON.stringify(response));
                } else {
                    const orderHistoryIndex = restaurant.history[
                        historyIndex
                    ].userHistory.findIndex(
                        (orderHistory) => orderHistory._id == orderHistoryId
                    );

                    if (orderHistoryIndex == -1) {
                        const response = {
                            error: "Order history not found",
                        };
                        ws.send(JSON.stringify(response));
                    } else {
                        restaurant.history[historyIndex].userHistory.splice(
                            orderHistoryIndex,
                            1
                        );

                        if (
                            restaurant.history[historyIndex].userHistory
                                .length == 0
                        ) {
                            restaurant.history.splice(historyIndex, 1);
                        }

                        restaurant
                            .save()
                            .then((restaurant) => {
                                const response = {
                                    orderHistory:
                                        restaurant.history[historyIndex],
                                };
                                ws.send(JSON.stringify(response));
                            })
                            .catch((err) => {
                                console.log(err);
                                const response = {
                                    error: "Error while saving restaurant",
                                    detail: err,
                                };
                                ws.send(JSON.stringify(response));
                            });
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error finding restaurant",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

module.exports = {
    getOrderHistory,
    createOrderHistory,
    updateOrderHistory,
    deleteOrderHistory,
};

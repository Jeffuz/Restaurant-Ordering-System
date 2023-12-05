const OrderHistory = require("../models/orderHistoryModel");
const Restaurant = require("../models/restaurantModel");

function getOrderHistory(message) {
    const restaurantId = message.restaurantId;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({
                        error: "Restaurant not found",
                    });
                } else {
                    resolve({
                        action: "GETORDERHISTORY",
                        orderHistory: restaurant.history,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error finidng restaurant",
                    detail: err,
                });
            });
    });
}

function createOrderHistory(message) {
    const restaurantId = message.restaurantId;
    const { usrId, menuItemId, quantity, custom, price } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
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
                            resolve({
                                action: "CREATEORDERHISTORY",
                                orderHistory: restaurant.history,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            reject({
                                error: "Error while saving restaurant",
                                detail: err,
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

function updateOrderHistory(message) {
    const restaurantId = message.restaurantId;
    const { usrId, orderHistoryId } = message;
    const { menuItemId, quantity, custom, price } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({
                        error: "Restaurant not found",
                    });
                } else {
                    const historyIndex = restaurant.history.findIndex(
                        (history) => history.usrId == usrId
                    );

                    if (historyIndex == -1) {
                        reject({
                            error: "User not found in history",
                        });
                    } else {
                        const orderHistoryIndex = restaurant.history[
                            historyIndex
                        ].userHistory.findIndex(
                            (orderHistory) => orderHistory._id == orderHistoryId
                        );

                        if (orderHistoryIndex == -1) {
                            reject({
                                error: "Order history not found",
                            });
                        } else {
                            const orderHistory =
                                restaurant.history[historyIndex].userHistory[
                                    orderHistoryIndex
                                ];

                            if (menuItemId)
                                orderHistory.menuItemId = menuItemId;
                            if (quantity) orderHistory.quantity = quantity;
                            if (custom) orderHistory.custom = custom;
                            if (price) orderHistory.price = price;

                            restaurant
                                .save()
                                .then((restaurant) => {
                                    resolve({
                                        action: "UPDATEORDERHISTORY",
                                        orderHistory:
                                            restaurant.history[historyIndex],
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    reject({
                                        error: "Error while saving restaurant",
                                        detail: err,
                                    });
                                });
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

function deleteOrderHistory(message) {
    const restaurantId = message.restaurantId;
    const { usrId, orderHistoryId } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                reject({
                    error: "Restaurant not found",
                });
            } else {
                const historyIndex = restaurant.history.findIndex(
                    (history) => history.usrId == usrId
                );

                if (historyIndex == -1) {
                    reject({
                        error: "User not found in history",
                    });
                } else {
                    const orderHistoryIndex = restaurant.history[
                        historyIndex
                    ].userHistory.findIndex(
                        (orderHistory) => orderHistory._id == orderHistoryId
                    );

                    if (orderHistoryIndex == -1) {
                        reject({
                            error: "Order history not found",
                        });
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
                                resolve({
                                    action: "DELETEORDERHISTORY",
                                    orderHistory:
                                        restaurant.history[historyIndex],
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                reject({
                                    error: "Error while saving restaurant",
                                    detail: err,
                                });
                            });
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
            reject({
                error: "Error finding restaurant",
                detail: err,
            });
        });
}

module.exports = {
    getOrderHistory,
    createOrderHistory,
    updateOrderHistory,
    deleteOrderHistory,
};

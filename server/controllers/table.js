const { Table, TableItem, OrderItem } = require("../models/tableModel");
const Restaurant = require("../models/restaurantModel");

function getTables(message) {
    const restaurantId = message.restaurantId;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    resolve({
                        action: "GETTABLES",
                        tableList: restaurant.table,
                    });
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error while retrieving tables",
                    detail: err,
                });
            });
    });
}

function createTable(message) {
    const restaurantId = message.restaurantId;
    const { seatCapacity } = message;

    const newTable = new TableItem({
        seatCapacity: seatCapacity,
        isOccupied: false,
        order: [],
    });

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    restaurant.table.tableList.push(newTable);
                    restaurant.table.totalTableCount += 1;
                    restaurant.save();
                    resolve({ action: "CREATETABLE", table: restaurant.table });
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error while creating table",
                    detail: err,
                });
            });
    });
}

function deleteTable(message) {
    const restaurantId = message.restaurantId;
    const tableId = message.tableId;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const tableIndex = restaurant.table.tableList.findIndex(
                        (table) => table._id == tableId
                    );

                    if (tableIndex === -1) {
                        reject({ error: "Table not found" });
                    } else {
                        restaurant.table.tableList.splice(tableIndex, 1);
                        restaurant.table.totalTableCount -= 1;
                        restaurant.save();
                        resolve({
                            action: "DELETETABLE",
                            table: restaurant.table,
                        });
                    }
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error while deleting table",
                    detail: err,
                });
            });
    });
}

function updateTableOccupancy(message) {
    const restaurantId = message.restaurantId;
    const { tableId, isOccupied } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId).then((restaurant) => {
            if (!restaurant) {
                reject({ error: "Restaurant not found" });
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );
                if (tableIndex === -1) {
                    reject({ error: "Table not found" });
                } else {
                    restaurant.table.tableList[tableIndex].isOccupied =
                        isOccupied;
                    restaurant
                        .save()
                        .then(() => {
                            resolve({
                                action: "UPDATETABLEOCCUPANCY",
                                table: restaurant.table,
                            });
                        })
                        .catch((err) => {
                            reject({
                                error: "Error saving table",
                                details: err,
                            });
                        });
                }
            }
        });
    });
}

function updateTableSeatCapacity(message) {
    const restaurantId = message.restaurantId;
    const { tableId, seatCapacity } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const tableIndex = restaurant.table.tableList.findIndex(
                        (table) => table._id == tableId
                    );
                    if (tableIndex === -1) {
                        reject({ error: "Table not found" });
                    } else {
                        restaurant.table.tableList[tableIndex].seatCapacity =
                            seatCapacity;
                        restaurant
                            .save()
                            .then(() => {
                                resolve({
                                    action: "UPDATETABLESEATCAPACITY",
                                    table: restaurant.table,
                                });
                            })
                            .catch((err) => {
                                reject({
                                    error: "Error saving table",
                                    details: err,
                                });
                            });
                    }
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

function updateTableOrder(message) {
    const restaurantId = message.restaurantId;
    const { tableId, orderId, menuItemId, quantity, custom, price, status } =
        message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const tableIndex = restaurant.table.tableList.findIndex(
                        (table) => table._id == tableId
                    );

                    if (tableIndex === -1) {
                        reject({ error: "Table not found" });
                    } else {
                        const orderIndex = restaurant.table.tableList[
                            tableIndex
                        ].order.findIndex((order) => order._id == orderId);
                        if (orderIndex === -1) {
                            reject({ error: "Order not found" });
                        } else {
                            const order =
                                restaurant.table.tableList[tableIndex].order[
                                    orderIndex
                                ];
                            if (menuItemId) order.menuItemId = menuItemId;
                            if (quantity) order.quantity = quantity;
                            if (custom) order.custom = custom;
                            if (price) order.price = price;
                            if (status) order.status = status;

                            restaurant
                                .save()
                                .then(() => {
                                    resolve({
                                        action: "UPDATETABLEORDER",
                                        table: restaurant.table,
                                    });
                                })
                                .catch((err) => {
                                    reject({
                                        error: "Error saving order",
                                        details: err,
                                    });
                                });
                        }
                    }
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

function createTableOrder(message) {
    const { restaurantId, tableId } = message;
    const { menuItemId, quantity, custom, price, status } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const tableIndex = restaurant.table.tableList.findIndex(
                        (table) => table._id == tableId
                    );
                    if (tableIndex === -1) {
                        reject({ error: "Table not found" });
                    } else {
                        const newOrder = new OrderItem({
                            menuItemId,
                            quantity,
                            custom,
                            price,
                            status,
                        });
                        restaurant.table.tableList[tableIndex].order.push(
                            newOrder
                        );
                        restaurant.save();
                        resolve({
                            action: "CREATETABLEORDER",
                            table: restaurant.table,
                        });
                    }
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

function deleteTableOrder(message) {
    const { restaurantId, tableId, orderId } = message;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const tableIndex = restaurant.table.tableList.findIndex(
                        (table) => table._id == tableId
                    );

                    if (tableIndex === -1) {
                        reject({ error: "Table not found" });
                    } else {
                        const orderIndex = restaurant.table.tableList[
                            tableIndex
                        ].order.findIndex((order) => order._id == orderId);
                        if (orderIndex === -1) {
                            reject({ error: "Order not found" });
                        } else {
                            restaurant.table.tableList[tableIndex].order.splice(
                                orderIndex,
                                1
                            );
                            restaurant
                                .save()
                                .then(() => {
                                    resolve({
                                        action: "DELETETABLEORDER",
                                        table: restaurant.table,
                                    });
                                })
                                .catch((err) => {
                                    reject({
                                        error: "Error saving order",
                                        details: err,
                                    });
                                });
                        }
                    }
                }
            })
            .catch((err) => {
                (err);
                reject({
                    error: "Error finding restaurant",
                    detail: err,
                });
            });
    });
}

module.exports = {
    getTables,
    createTable,
    deleteTable,
    updateTableOccupancy,
    updateTableSeatCapacity,
    updateTableOrder,
    createTableOrder,
    deleteTableOrder,
};

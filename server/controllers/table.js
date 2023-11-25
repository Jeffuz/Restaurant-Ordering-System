const { Table, TableItem, OrderItem } = require("../models/tableModel");
const Restaurant = require("../models/restaurantModel");

function getTables(ws, message) {
    const restaurantId = message.restaurantId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = {
                    error:
                        "Restaurant not found for restaurantId: " +
                        restaurantId,
                };
                ws.send(JSON.stringify(response));
            } else {
                const response = {
                    action: "tableList",
                    tableList: restaurant.table,
                };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while retrieving tables",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function createTable(ws, message) {
    const restaurantId = message.restaurantId;
    const { seatCapacity } = message;

    const newTable = new TableItem({
        seatCapacity: seatCapacity,
        isOccupied: false,
        order: [],
    });

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                restaurant.table.tableList.push(newTable);
                restaurant.table.totalTableCount += 1;
                restaurant.save();
                const response = { table: newTable };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = { error: err };
            ws.send(JSON.stringify(response));
        });
}

function deleteTable(ws, message) {
    const restaurantId = message.restaurantId;
    const tableId = message.tableId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );

                if (tableIndex === -1) {
                    const response = { error: "Table not found" };
                    ws.send(JSON.stringify(response));
                } else {
                    restaurant.table.tableList.splice(tableIndex, 1);
                    restaurant.table.totalTableCount -= 1;
                    restaurant.save();
                    const response = { table: restaurant.table };
                    ws.send(JSON.stringify(response));
                }
            }
        })
        .catch((err) => {
            console.log(err);
            const response = { error: err };
            ws.send(JSON.stringify(response));
        });
}

function updateTableOccupancy(ws, message) {
    const restaurantId = message.restaurantId;
    const { tableId, isOccupied } = message;

    Restaurant.findById(restaurantId).then((restaurant) => {
        if (!restaurant) {
            const response = { error: "Restaurant not found" };
            ws.send(JSON.stringify(response));
        } else {
            const tableIndex = restaurant.table.tableList.findIndex(
                (table) => table._id == tableId
            );
            if (tableIndex === -1) {
                const response = { error: "Table not found" };
                ws.send(JSON.stringify(response));
            } else {
                restaurant.table.tableList[tableIndex].isOccupied = isOccupied;
                restaurant
                    .save()
                    .then(() => {
                        const response = { table: restaurant.table };
                        ws.send(JSON.stringify(response));
                    })
                    .catch((err) => {
                        const response = {
                            error: "Error saving table",
                            details: err,
                        };
                        ws.send(JSON.stringify(response));
                    });
            }
        }
    });
}

function updateTableSeatCapacity(ws, message) {
    const restaurantId = message.restaurantId;
    const { tableId, seatCapacity } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );
                if (tableIndex === -1) {
                    const response = { error: "Table not found" };
                    ws.send(JSON.stringify(response));
                } else {
                    restaurant.table.tableList[tableIndex].seatCapacity =
                        seatCapacity;
                    restaurant
                        .save()
                        .then(() => {
                            const response = { table: restaurant.table };
                            ws.send(JSON.stringify(response));
                        })
                        .catch((err) => {
                            const response = {
                                error: "Error saving table",
                                details: err,
                            };
                            ws.send(JSON.stringify(response));
                        });
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

function updateTableOrder(ws, message) {
    const restaurantId = message.restaurantId;
    const { tableId, orderId, menuItemId, quantity, custom, price, status } =
        message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );

                if (tableIndex === -1) {
                    const response = { error: "Table not found" };
                    ws.send(JSON.stringify(response));
                } else {
                    const orderIndex = restaurant.table.tableList[
                        tableIndex
                    ].order.findIndex((order) => order._id == orderId);
                    if (orderIndex === -1) {
                        const response = { error: "Order not found" };
                        ws.send(JSON.stringify(response));
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
                                const response = { table: restaurant.table };
                                ws.send(JSON.stringify(response));
                            })
                            .catch((err) => {
                                const response = {
                                    error: "Error saving table",
                                    details: err,
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

function createTableOrder(ws, message) {
    const { restaurantId, tableId } = message;
    const { menuItemId, quantity, custom, price, status } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );
                if (tableIndex === -1) {
                    const response = { error: "Table not found" };
                    ws.send(JSON.stringify(response));
                } else {
                    const newOrder = new OrderItem({
                        menuItemId,
                        quantity,
                        custom,
                        price,
                        status,
                    });
                    restaurant.table.tableList[tableIndex].order.push(newOrder);
                    restaurant.save();
                    const response = { table: restaurant.table };
                    ws.send(JSON.stringify(response));
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

function deleteTableOrder(ws, message) {
    const { restaurantId, tableId, orderId } = message;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const tableIndex = restaurant.table.tableList.findIndex(
                    (table) => table._id == tableId
                );

                if (tableIndex === -1) {
                    const response = { error: "Table not found" };
                    ws.send(JSON.stringify(response));
                } else {
                    const orderIndex = restaurant.table.tableList[
                        tableIndex
                    ].order.findIndex((order) => order._id == orderId);
                    if (orderIndex === -1) {
                        const response = { error: "Order not found" };
                        ws.send(JSON.stringify(response));
                    } else {
                        restaurant.table.tableList[tableIndex].order.splice(
                            orderIndex,
                            1
                        );
                        restaurant
                            .save()
                            .then(() => {
                                const response = { table: restaurant.table };
                                ws.send(JSON.stringify(response));
                            })
                            .catch((err) => {
                                const response = {
                                    error: "Error saving order",
                                    details: err,
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
    getTables,
    createTable,
    deleteTable,
    updateTableOccupancy,
    updateTableSeatCapacity,
    updateTableOrder,
    createTableOrder,
    deleteTableOrder,
};

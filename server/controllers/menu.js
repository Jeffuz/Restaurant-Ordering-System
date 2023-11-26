const { Menu, MenuItem } = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");

function getMenus(ws, message) {
    const restaurantId = "65381ed4030fa645be95b250";

    return new Promise((resolve, reject) => {
        Menu.findById(restaurantId)
            .then((menu) => {
                if (!menu) {
                    reject({
                        error:
                            "Menus not found for restaurantId: " + restaurantId,
                    });
                } else {
                    resolve({ action: "MENU", menuList: menu.menuList });
                }
            })
            .catch((err) => {
                console.log(err);
                reject({
                    error: "Error while retrieving menus",
                    detail: err,
                });
            });
    });

    // const restaurantId = message.restaurantId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const response = {
                    menuList: restaurant.restaurantMenu.menuList,
                };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = {
                error: "Error while retrieving menus",
                detail: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function getMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            } else {
                const menuItem = restaurant.restaurantMenu.menuList.find(
                    (menuItem) => menuItem.menuId == menuId
                );
                const response = { menuItem: menuItem };
                ws.send(JSON.stringify(response));
            }
        })
        .catch((err) => {
            console.log(err);
            const response = { error: err };
            ws.send(JSON.stringify(response));
        });
}

function createMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const {
        menuId,
        image,
        filter,
        name,
        price,
        description,
        diet,
        customizable,
        custom,
    } = message;

    const newMenuItem = new MenuItem({
        menuId,
        image,
        filter,
        name,
        price,
        description,
        diet,
        customizable,
        custom,
    });

    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const response = { error: "Restaurant not found" };
                ws.send(JSON.stringify(response));
            }
            restaurant.restaurantMenu.menuList.push(newMenuItem);
            restaurant.restaurantMenu.totalItemCount++;

            restaurant
                .save()
                .then(() => {
                    const response = { menuItem: newMenuItem };
                    ws.send(JSON.stringify(response));
                })
                .catch((err) => {
                    const response = {
                        error: "Error saving menu",
                        details: err,
                    };
                    ws.send(JSON.stringify(response));
                });
        })
        .catch((err) => {
            const response = {
                error: "Error finding menus",
                details: err,
            };
            ws.send(JSON.stringify(response));
        });
}

function updateMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const {
        menuId,
        image,
        filter,
        name,
        price,
        description,
        diet,
        customizable,
        custom,
    } = message;

    Restaurant.findById(restaurantId).then((restaurant) => {
        if (!restaurant) {
            const response = { error: "Restaurant not found" };
            ws.send(JSON.stringify(response));
        }
        const menuItem = restaurant.restaurantMenu.menuList.find(
            (menuItem) => String(menuItem.menuId) == menuId
        );
        if (!menuItem) {
            const response = { error: "Menu item not found" };
            ws.send(JSON.stringify(response));
        }
        if (image) menuItem.image = image;
        if (filter) menuItem.filter = filter;
        if (name) menuItem.name = name;
        if (price) menuItem.price = price;
        if (description) menuItem.description = description;
        if (diet) menuItem.diet = diet;
        if (customizable) menuItem.customizable = customizable;
        if (custom) menuItem.custom = custom;

        restaurant
            .save()
            .then(() => {
                const response = { menuItem: menuItem };
                ws.send(JSON.stringify(response));
            })
            .catch((err) => {
                const response = {
                    error: "Error updating menu",
                    details: err,
                };
                ws.send(JSON.stringify(response));
            });
    });
}

function deleteMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    Restaurant.findById(restaurantId).then((restaurant) => {
        if (!restaurant) {
            const response = { error: "Restaurant not found" };
            ws.send(JSON.stringify(response));
        }
        const menuItem = restaurant.restaurantMenu.menuList.find(
            (menuItem) => menuItem.menuId == menuId
        );
        restaurant.restaurantMenu.menuList =
            restaurant.restaurantMenu.menuList.filter(
                (menuItem) => menuItem.menuId !== menuId
            );
        restaurant.restaurantMenu.totalItemCount =
            restaurant.restaurantMenu.menuList.length;

        restaurant
            .save()
            .then(() => {
                const response = { menuItem: menuItem };
                ws.send(JSON.stringify(response));
            })
            .catch((err) => {
                const response = {
                    error: "Error deleting menu",
                    details: err,
                };
                ws.send(JSON.stringify(response));
            });
    });
}

module.exports = {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
};

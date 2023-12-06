const { Menu, MenuItem } = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");

function getMenus(message) {
    const restaurantId = "6562c6cdc09336bb395262ae";

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({
                        error:
                            "Menus not found for restaurantId: " + restaurantId,
                    });
                } else {
                    resolve(restaurant.restaurantMenu.menuList);
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
}

function getMenu(message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                } else {
                    const menuItem = restaurant.restaurantMenu.menuList.find(
                        (menuItem) => menuItem.menuId == menuId
                    );
                    resolve(menuItem);
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err);
                reject({
                    error: "Error while retrieving menu",
                    detail: err,
                });
            });
    });
}

function createMenu(message) {
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

    console.log("newMenuItem:", newMenuItem);

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({
                        error: "Restaurant not found",
                    });
                }
                restaurant.restaurantMenu.menuList.push(newMenuItem);
                restaurant.restaurantMenu.totalItemCount++;

                restaurant
                    .save()
                    .then(() => {
                        resolve({
                            //menuList: newMenuItem,
                            menuList: getMenus(),
                        });
                    })
                    .catch((err) => {
                        reject({
                            error: "Error saving menu",
                            details: err,
                        });
                    });
            })
            .catch((err) => {
                reject({
                    error: "Error finding restaurant",
                    details: err,
                });
            });
    }).catch((err) => {
        console.error("Unhandled error:", err);
    });
}

function updateMenu(message) {
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

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
                }
                const menuItem = restaurant.restaurantMenu.menuList.find(
                    (menuItem) => String(menuItem.menuId) == menuId
                );
                if (!menuItem) {
                    reject({ error: "Menu item not found" });
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
                        getMenus().then((menu) => {
                            resolve({ menuList: menu });
                        });
                    })
                    .catch((err) => {
                        reject({
                            error: "Error updating menu",
                            details: err,
                        });
                    });
            })
            .catch((err) => {
                reject({
                    error: "Error finding restaurant",
                    details: err,
                });
            });
    }).catch((err) => {
        console.error("Unhandled error:", err);
    });
}

function deleteMenu(message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    // // testing message
    // console.log(restaurantId,menuId);
    // return;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({ error: "Restaurant not found" });
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
                        resolve({ menuList: getMenus() });
                    })
                    .catch((err) => {
                        reject({
                            error: "Error deleting menu",
                            details: err,
                        });
                    });
            })
            .catch((err) => {
                reject({
                    error: "Error finding restaurant",
                    details: err,
                });
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

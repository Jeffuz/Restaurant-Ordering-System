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
                    resolve({ action: "MENU", menuList: restaurant.restaurantMenu.menuList});
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
                    resolve({ action: "GETMENU", menuItem: menuItem });
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

function createMenu(ws,message) {
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

    return new Promise((resolve, reject) => {  
        Restaurant.findById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    reject({
                        error: "Restaurant not found",
                    });
                }

                // Finding whether a duplicating item is adding
                const menuItem = restaurant.restaurantMenu.menuList.find(
                    (menuItem) => String(menuItem.menuId) == menuId
                );
                if (menuItem){
                    reject({ error: "Menu item Duplicate" });
                    const response = { action: "MENU", error:"Error creating menu item, item name duplicate"};
                    ws.send(JSON.stringify(response));
                    return;
                }

                restaurant.restaurantMenu.menuList.push(newMenuItem);
                restaurant.restaurantMenu.totalItemCount++;

                restaurant
                    .save()
                    .then(() => {
                        resolve({
                            action: "CREATEMENU",
                            menuItem: newMenuItem,
                        });

                        // if success then send updated MenuList by to client
                        const response = { action: "MENU", ev:"CREATEMENU",menuList: restaurant.restaurantMenu.menuList};
                        ws.send(JSON.stringify(response));

                    })
                    .catch((err) => {
                        reject({
                            error: "Error creating menu item, name and price is required",
                            details: err,
                        });
                        // alert admin when their operations are not passed by database
                        const response = { action: "MENU", error:"Error creating menu item, name and price is required"};
                        ws.send(JSON.stringify(response));
                    });
            }).catch((err) => {
                reject({
                    error: "Error finding restaurant",
                    details: err,
                });
            });
    }).catch((err) => {
        console.log(err.error);    
    });
}

function updateMenu(ws,message) {
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
        Restaurant.findById(restaurantId).then((restaurant) => {
            if (!restaurant) {
                reject({ error: "Restaurant not found" });
            }
            const menuItem = restaurant.restaurantMenu.menuList.find(
                (menuItem) => String(menuItem.menuId) == menuId
            );
            if (!menuItem) {
                reject({ error: "Menu item not found" });
                const response = { action: "MENU", error:"Error editing menu item, not allowed to change menu item name, please add new item or delete current item"};
                ws.send(JSON.stringify(response));
                return;
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
                    resolve({ action: "UPDATEMENU", menuItem: menuItem });

                    // if success then send updated MenuList by to client
                    const response = { action: "MENU", ev:"UPDATEMENU", menuList: restaurant.restaurantMenu.menuList };
                    ws.send(JSON.stringify(response));

                })
                .catch((err) => {
                    reject({
                        error: "Error updating menu",
                        details: err,
                    });
                });
        }).catch((err) => {
            reject({
                error: "Error finding restaurant",
                details: err,
            });
        });
    }).catch((err) => {
        console.error('Unhandled error:', err);
    });
}

function deleteMenu(ws,message) {


    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    // // testing message
    // console.log(restaurantId,menuId);
    // return;

    return new Promise((resolve, reject) => {
        Restaurant.findById(restaurantId).then((restaurant) => {
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
                    resolve({ action: "DELETEMENU", menuItem: menuItem });
                    // if success then send updated MenuList by to client
                    const response = { action: "MENU", menuList: restaurant.restaurantMenu.menuList };
                    ws.send(JSON.stringify(response));
                })
                .catch((err) => {
                    reject({
                        error: "Error deleting menu",
                        details: err,
                    });
                });
        }).catch((err) => {
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

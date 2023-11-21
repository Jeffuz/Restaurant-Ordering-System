const { Menu, MenuItem } = require("../models");

function getMenus(ws, message) {
    //const restaurantId = message.restaurantId;
    const restaurantId = '65381ed4030fa645be95b250';
    
    return new Promise((resolve, reject) => {
        Menu.findById(restaurantId)
            .then((menu) => {
                if (!menu) {
                    reject({
                        error: "Menus not found for restaurantId: " + restaurantId,
                    });
                } else {
                    resolve({ action: 'MENU', menuList: menu.menuList });
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

function getMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    Menu.findById(restaurantId)
        .then((menu) => {
            if (!menu) {
                const response = { error: "Menus not found" };
                ws.send(JSON.stringify(response));
            } else {
                const menuItem = menu.menuList.find(
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
    const { menuId, image, filter, name, price, description, diet } = message;

    const newMenuItem = new MenuItem({
        menuId,
        image,
        filter,
        name,
        price,
        description,
        diet,
    });

    Menu.findById(restaurantId)
        .then((menu) => {
            if (!menu) {
                const response = { error: "Menus not found" };
                ws.send(JSON.stringify(response));
            }
            menu.menuList.push(newMenuItem);
            menu.totalItemCount++;

            menu.save()
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
    const { menuId, image, filter, name, price, description, diet } = message;

    Menu.findById(restaurantId).then((menu) => {
        if (!menu) {
            const response = { error: "Menus not found" };
            ws.send(JSON.stringify(response));
        }
        const menuItem = menu.menuList.find(
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

        menu.save()
            .then(() => {
                const response = { menuItem: menuItem };
                ws.send(JSON.stringify(response));
            })
            .catch((err) => {
                const response = {
                    error: "Error saving menu",
                    details: err,
                };
                ws.send(JSON.stringify(response));
            });
    });
}

function deleteMenu(ws, message) {
    const restaurantId = message.restaurantId;
    const menuId = message.menuId;

    Menu.findById(restaurantId).then((menu) => {
        if (!menu) {
            const response = { error: "Menus not found" };
            ws.send(JSON.stringify(response));
        }
        const menuItem = menu.menuList.find(
            (menuItem) => menuItem.menuId == menuId
        );
        menu.menuList = menu.menuList.filter(
            (menuItem) => menuItem.menuId !== menuId
        );
        menu.totalItemCount--;

        menu.save()
            .then(() => {
                const response = { menuItem: menuItem };
                ws.send(JSON.stringify(response));
            })
            .catch((err) => {
                const response = {
                    error: "Error saving menu",
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

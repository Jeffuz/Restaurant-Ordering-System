const mongoose = require("mongoose");
const { Menu, MenuItem, MenuString } = require("../models");

function getMenus(ws, message) {
    // const restaurantId = new mongoose.Types.ObjectId(message.restaurantId);
    const restaurantId = message.restaurantId;

    Menu.findById(restaurantId)
        .then((menu) => {
            console.log(menu);
            if (!menu) {
                const response = {
                    error: "Menus not found for restaurantId: " + restaurantId,
                };
                ws.send(JSON.stringify(response));
            } else {
                const response = { menuList: menu.menuList };
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

    Menu.findById(restaurantId)
        .then((menu) => {
            if (!menu) {
                const response = { error: "Menus not found" };
                ws.send(JSON.stringify(response));
            } else {
                const menuItem = menu.menuList.find(
                    (menuItem) => menuItem._id == menuId
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
    const { name, price, description } = message;

    const newMenuItem = new MenuItem({
        name,
        price,
        description,
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
    const { menuId, name, price, description } = message;

    Menu.findById(restaurantId).then((menu) => {
        if (!menu) {
            const response = { error: "Menus not found" };
            ws.send(JSON.stringify(response));
        }
        const menuItem = menu.menuList.find(
            (menuItem) => String(menuItem._id) == menuId
        );
        if (!menuItem) {
            const response = { error: "Menu item not found" };
            ws.send(JSON.stringify(response));
        }
        if (name) menuItem.name = name;
        if (price) menuItem.price = price;
        if (description) menuItem.description = description;

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
            (menuItem) => menuItem._id == menuId
        );
        menu.menuList = menu.menuList.filter(
            (menuItem) => menuItem._id !== menuId
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

/*
const getMenus = (req, res) => {
    const restaurantId = req.params.id;

    Menu.findById(restaurantId)
        .then((menus) => {
            if (!menus) {
                return res.status(404).json({ error: "Menus not found" });
            }
            res.json(menus);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

const getMenu = (req, res) => {
    const restaurantId = req.params.id;
    const menuId = req.body.id;

    Menu.findById(restaurantId)
        .then((menu) => {
            if (!menu) {
                return res.status(404).json({ error: "Menus not found" });
            }
            const menuItem = menu.menuList.find(
                (menuItem) => menuItem._id == menuId
            );
            res.json(menuItem);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

const createMenu = (req, res) => {
    const restaurantId = req.params.id;
    const { name, price, description } = req.body;
    const newMenuItem = new MenuItem({
        name,
        price,
        description,
    });

    Menu.findById(restaurantId)
        .then((menu) => {
            if (!menu) {
                return res.status(404).json({ error: "Menus not found" });
            }
            menu.menuList.push(newMenuItem);
            menu.totalItemCount++;

            menu.save()
                .then(() => {
                    res.status(201).json(newMenuItem);
                })
                .catch((err) => {
                    res.status(500).json({
                        error: "Error saving menu",
                        details: err,
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                error: "Error finding menus",
                details: err,
            });
        });
};

const updateMenu = (req, res) => {
    const restaurantId = req.params.id;
    const { menuId, name, price, description } = req.body;

    Menu.findById(restaurantId).then((menu) => {
        if (!menu) {
            return res.status(404).json({ error: "Menus not found" });
        }
        const menuItem = menu.menuList.find(
            (menuItem) => String(menuItem._id) == menuId
        );
        if (!menuItem) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        if (name) menuItem.name = name;
        if (price) menuItem.price = price;
        if (description) menuItem.description = description;

        menu.save()
            .then(() => {
                res.status(201).json(menuItem);
            })
            .catch((err) => {
                res.status(500).json({
                    error: "Error saving menu",
                    details: err,
                });
            });
    });
};

const deleteMenu = (req, res) => {
    const restaurantId = req.params.id;
    const menuId = req.body.id;

    Menu.findById(restaurantId).then((menu) => {
        if (!menu) {
            return res.status(404).json({ error: "Menus not found" });
        }
        const menuItem = menu.menuList.find(
            (menuItem) => menuItem._id == menuId
        );
        menu.menuList = menu.menuList.filter(
            (menuItem) => menuItem._id !== menuId
        );
        menu.totalItemCount--;

        menu.save()
            .then(() => {
                res.status(204).json(menuItem);
            })
            .catch((err) => {
                res.status(500).json({
                    error: "Error saving menu",
                    details: err,
                });
            });
    });
};
*/

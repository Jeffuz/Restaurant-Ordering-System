const express = require("express");
const WebSocket = require("ws");
const DELIM = "\r\n";

const {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
} = require("./controllers/menu");

const {
    getRestaurant,
    createRestaurant,
    updateRestaurantName,
    deleteRestaurant,
} = require("./controllers/restaurant");

const {
    getTables,
    createTable,
    deleteTable,
    updateTableOccupancy,
    updateTableSeatCapacity,
    updateTableOrder,
    createTableOrder,
    deleteTableOrder,
} = require("./controllers/table");

const {
    getOrderHistory,
    createOrderHistory,
    updateOrderHistory,
    deleteOrderHistory,
} = require("./controllers/orderHistory");

class Server {
    constructor(port) {
        this.server = new WebSocket.Server({ port: port });
        this.server.on("connection", this.handleConnection.bind(this));
        this.clients = []; // array of connected ClientWebSockets
        this.disconnected = []; // array of disconnected ClientWebSockets
        this.master = []; // array of ClientWebSocket
    }

    /*********************************
  HANDLER FUNCTIONS
  **********************************/

    /**
     * Register client into system
     * @param {ClientWebSocket} client
     * @returns {null}
     * WARNING: Should only be called by handleConnection()
     */
    initializeClientConnection(client) {
        // Generates a random serial for client-ID
        function generateUniqueID() {
            function x() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return x() + x() + "-" + x();
        }

        // Keep track of connected clients
        this.clients.push(client);

        // Assign client unique ID
        client.id = generateUniqueID();

        // Send menu to client
        this.sendMenu(client);

        this.sendInit(client, client.id);
        console.log(
            `Client ${client.id} connected. Total clients: ${this.clients.length}`
        );
        return;
    }

    /**
     * Handles anything related to the connection between client and server
     * @param {ClientWebSocket} client
     * @returns {void}
     */
    handleConnection(client) {
        this.initializeClientConnection(client);

        // Close handler
        client.on("close", () => {
            if (client === this.master) {
                this.sendBroadcast("ALERT: MASTER SYSTEM DISCONNECTED");
            }

            this.clients = this.clients.filter((item) => item !== client);
            this.master = this.master.filter((item) => item !== client);

            console.log(
                `${client.id} disconnected. Connected clients: ${this.clients.length}`
            );
            return;
        });

        // Message Method handler
        // message: String
        client.on("message", (message) => {
            const payload = JSON.parse(message);
            let action = payload.action;
            switch (action) {
                case "BROADCAST":
                    this.sendBroadcast(payload);
                    break;

                case "MESSAGE":
                    console.log(`Server received message ${message.message}`);
                    break;

                case "REQUESTMASTER":
                    console.log("Received master request");
                    this.master.push(client);
                    console.log("Current masters:");
                    this.master.forEach((master) => {
                        console.log(master.id);
                    });
                    break;

                case "ORDER":
                    console.log(`Server received ORDER request`);
                    let orders = payload.cart;
                    this.sendOrderToKitchen(client, orders);
                    break;

                // Restaurant
                case "GETRESTAURANT":
                    console.log("Received request GETRESTAURANT");
                    getRestaurant(payload);
                    break;

                case "CREATERESTAURANT":
                    console.log("Received request CREATERESTAURANT");
                    createRestaurant(payload);
                    break;

                case "UPDATERESTAURANTNAME":
                    console.log("Received request UPDATERESTAURANTNAME");
                    updateRestaurantName(payload);
                    break;

                case "DELETERESTAURANT":
                    console.log("Received request DELETERESTAURANT");
                    deleteRestaurant(payload);
                    break;

                // Menu
                case "GETMENUS":
                    console.log("Received request GETMENUS");
                    getMenus(payload);
                    break;

                case "GETMENU":
                    console.log("Received request GETMENU");
                    getMenu(payload);
                    break;

                case "CREATEMENU":
                    console.log("Received request CREATEMENU");
                    createMenu(client,payload);
                    break;

                case "DELETEMENU":
                    console.log("Received request DELETEMENU");

                    // // testing fixing by Rixin Li
                    // console.log("testing delete working?");
                    // // checking payload
                    // console.log(payload);

                    deleteMenu(client,payload);
                    break;

                case "EDITMENU":
                    console.log("Received request EDITMENU");
                    updateMenu(client,payload);
                    break;

                // Table
                case "GETTABLES":
                    console.log("Received request GETTABLES");
                    getTables(payload);
                    break;

                case "CREATETABLE":
                    console.log("Received request CREATETABLE");
                    createTable(payload);
                    break;

                case "DELETETABLE":
                    console.log("Received request DELETETABLE");
                    deleteTable(payload);
                    break;

                case "UPDATETABLEOCCUPANCY":
                    console.log("Received request UPDATETABLEOCCUPANCY");
                    updateTableOccupancy(payload);
                    break;

                case "UPDATETABLESEATCAPACITY":
                    console.log("Received request UPDATETABLESEATCAPACITY");
                    updateTableSeatCapacity(payload);
                    break;

                case "UPDATETABLEORDER":
                    console.log("Received request UPDATETABLEORDER");
                    updateTableOrder(payload);
                    break;

                case "CREATETABLEORDER":
                    console.log("Received request CREATETABLEORDER");
                    createTableOrder(payload);
                    break;

                case "DELETETABLEORDER":
                    console.log("Received request DELETETABLEORDER");
                    deleteTableOrder(payload);
                    break;

                // Order History
                case "GETORDERHISTORY":
                    console.log("Received request GETORDERHISTORY");
                    getOrderHistory(payload);
                    break;

                case "CREATEORDERHISTORY":
                    console.log("Received request CREATEORDERHISTORY");
                    createOrderHistory(client, payload);
                    break;

                case "UPDATEORDERHISTORY":
                    console.log("Received request UPDATEORDERHISTORY");
                    updateOrderHistory(client, payload);
                    break;

                case "DELETEORDERHISTORY":
                    console.log("Received request DELETEORDERHISTORY");
                    deleteOrderHistory(client, payload);
                    break;

                default:
                    console.log(
                        `Server received unsupported request "${action}" with payload "${payload}"`
                    );
            }
        });

        return;
    }

    /*********************************
  GETTER FUNCTIONS
  **********************************/

    /**
     * Finds client by searching with given ID
     * @param {String} id
     * @returns {ClientWebSocket | undefined}
     * NOTE: ClientWebSocket is simply the WebSocket obj representing the client
     */
    getClientById(id) {
        return this.clients.find((client) => client.id === id);
    }

    /*********************************
  MESSAGE FUNCTIONS
  **********************************/

    /**
     * Broadcasts message to all connected clients
     * @param {String} message Message to send
     * @returns {null}
     */
    sendBroadcast(message) {
        const actionObject = {
            action: "BROADCAST",
            message: message,
        };

        this.clients.forEach((client) => {
            client.send(JSON.stringify(actionObject));
        });

        return;
    }

    // Send message to a specific client
    // Inputs: (client: string, message: string)
    /**
     * Sends message message to specific client client
     * @param {ClientWebSocket} client Client WebSocket Object
     * @param {String} message
     * @returns {null}
     */
    sendMessage(client, message) {
        const actionObject = {
            action: "MESSAGE",
            message: message,
        };

        client.send(JSON.stringify(actionObject));

        return;
    }

    /**
     * Sends initialization package to client
     * @param {ClientWebSocket} client Client WebSocket Object
     * @param {String} id Server-assigned ID
     * @param {Bool} isMaster Signals if system is master or slave
     */
    sendInit(client, id, isMaster) {
        var actionObject;
        getMenus().then((menu) => {
            var actionObject = {
                action: "INIT",
                ID: id,
                menu: menu,
            };
            client.send(JSON.stringify(actionObject));
        });

        return;
    }

    /**
     * Sends [order] to masters
     * @param {*} client
     * @param {*} order
     */
    sendOrderToKitchen(client, order) {
        console.log("Received order", order);
        const actionObject = {
            action: "ORDERPLACED",
            order: order,
        };

        this.master.forEach((master) => {
            master.send(JSON.stringify(actionObject));
        });

        return;
    }

    /**
     * Wrapper function for sendMenu
     * Pushes a menu update to all clients
     */
    pushMenuUpdate() {
        getMenus().then((menu) => {
            this.clients.forEach((client) => {
                client.send(JSON.stringify(menu));
            });
        });

        return;
    }

    /**
     * Sends menu update to clients
     * @param {ClientWebSocket} client
     * @returns
     */
    sendMenu(client) {
        getMenus().then((menu) => {
            client.send(JSON.stringify(menu));
        });

        return;
    }
}

const server = new Server(8080);
console.log("WebSocket server listening on Port 8080");

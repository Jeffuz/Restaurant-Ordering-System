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

class Server {
    constructor(port) {
        this.server = new WebSocket.Server({ port: port });
        this.server.on("connection", this.handleConnection.bind(this));
        this.clients = []; // array of connected ClientWebSockets
        this.disconnected = []; // array of disconnected ClientWebSockets
        this.master = null; // ClientWebSocket
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

        // Notify client of assigned ID and assign master/slave status
        let setAsMaster = false;
        if (!this.master) {
            this.master = client;
            setAsMaster = true;
            console.log(`Setting system ${client.id} as Master System`);
        }
        this.sendInit(client, client.id, setAsMaster);
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
        /*if(!this.clients.includes(client) && !this.disconnected.includes(client)){
      console.log('Client connection never seen before. Initializing.');
      this.initializeClientConnection(client);
    }else if (this.disconnected.includes(client)){
      console.log('Client was disconnected, now reconnected.');

    }*/

        this.initializeClientConnection(client);

        // Close handler
        client.on("close", () => {
            if (client === this.master) {
                this.sendBroadcast("ALERT: MASTER SYSTEM DISCONNECTED");
            }
            this.clients = this.clients.filter((item) => item !== client);
            this.disconnected.push(client);
            console.log("DISCONNECTED");
            this.disconnected.forEach((client) => {
                console.log(client.id);
            });
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

                case "ORDER":
                    console.log(`Server received ORDER request`);
                    console.log(payload.cart);
                    break;

                // Restaurant
                case "GETRESTAURANT":
                    console.log("Received request GETRESTAURANT");
                    getRestaurant(client, payload);
                    break;

                case "CREATERESTAURANT":
                    console.log("Received request CREATERESTAURANT");
                    createRestaurant(client, payload);
                    break;

                case "UPDATERESTAURANTNAME":
                    console.log("Received request UPDATERESTAURANTNAME");
                    updateRestaurantName(client, payload);
                    break;

                case "DELETERESTAURANT":
                    console.log("Received request DELETERESTAURANT");
                    deleteRestaurant(client, payload);
                    break;

                // Menu
                case "GETMENUS":
                    getMenus(client, payload);
                    break;

                case "CREATEMENU":
                    console.log("Received request CREATEMENU");
                    createMenu(client, payload);
                    break;

                case "DELETEMENU":
                    console.log("Received request DELETEMENU");
                    deleteMenu(client, payload);
                    break;

                case "EDITMENU":
                    console.log("Received request EDITMENU");
                    updateMenu(client, payload);
                    break;

                // Table
                case "GETTABLES":
                    console.log("Received request GETTABLES");
                    getTables(client, payload);
                    break;

                case "CREATETABLE":
                    console.log("Received request CREATETABLE");
                    createTable(client, payload);
                    break;

                case "DELETETABLE":
                    console.log("Received request DELETETABLE");
                    deleteTable(client, payload);
                    break;

                case "UPDATETABLEOCCUPANCY":
                    console.log("Received request UPDATETABLEOCCUPANCY");
                    updateTableOccupancy(client, payload);
                    break;

                case "UPDATETABLESEATCAPACITY":
                    console.log("Received request UPDATETABLESEATCAPACITY");
                    updateTableSeatCapacity(client, payload);
                    break;

                case "UPDATETABLEORDER":
                    console.log("Received request UPDATETABLEORDER");
                    updateTableOrder(client, payload);
                    break;

                case "CREATETABLEORDER":
                    console.log("Received request CREATETABLEORDER");
                    createTableOrder(client, payload);
                    break;

                case "DELETETABLEORDER":
                    console.log("Received request DELETETABLEORDER");
                    deleteTableOrder(client, payload);
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
        const actionObject = {
            action: "INIT",
            ID: id,
            isMaster: isMaster,
        };

        client.send(JSON.stringify(actionObject));

        return;
    }
}

const server = new Server(8080);
console.log("WebSocket server listening on Port 8080");

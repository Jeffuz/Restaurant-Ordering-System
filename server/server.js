const express = require("express");
const WebSocket = require("ws");

const {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
} = require("./controllers/menu");

class Server {
    constructor(port) {
        this.server = new WebSocket.Server({ port: port });
        this.server.on("connection", this.handleConnections.bind(this));
        this.clients = [];
    }

    initializeClientConnection(client) {
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
        console.log(
            `${client.id} connected. Total clients: ${this.clients.length}`
        );
        return;
    }

    handleConnections(client) {
        // Initialize client connection
        this.initializeClientConnection(client);

        // Connection close handler
        client.on("close", () => {
            //this.clients.splice(this.clients.indexOf(client));
            this.clients = this.clients.filter((item) => item !== client);
            console.log(
                `${client.id} disconnected. Connected clients: ${this.clients.length}`
            );
            return;
        });

        client.on("message", (message) => {
            const parsedMessage = JSON.parse(message);
            const { action } = parsedMessage;

            if (action === "getMenus") {
                console.log("getMenus");
                getMenus(client, parsedMessage);
            } else if (action === "getMenu") {
                console.log("getMenu");
                getMenu(client, parsedMessage);
            } else if (action === "createMenu") {
                console.log("createMenu");
                createMenu(client, parsedMessage);
            } else if (action === "updateMenu") {
                console.log("updateMenu");
                updateMenu(client, parsedMessage);
            } else if (action === "deleteMenu") {
                console.log("deleteMenu");
                deleteMenu(client, parsedMessage);
            }
        });
    }
}

const server = new Server(8080);
console.log("WebSocket server listening on Port 8080");

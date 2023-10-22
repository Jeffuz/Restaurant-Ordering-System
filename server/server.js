const express = require('express');
const WebSocket = require('ws');

class Server {
  constructor(port){
    this.server = new WebSocket.Server({ port: port });
    this.server.on('connection', this.handleConnections.bind(this));
    this.clients = [];
  }

  initializeClientConnection(client){
    function generateUniqueID() {
      function x() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return x() + x() + '-' + x();
    }

    // Keep track of connected clients
    this.clients.push(client);

    // Assign client unique ID
    client.id = generateUniqueID();
    console.log(`${client.id} connected. Total clients: ${this.clients.length}`);
    return;
  }

  handleConnections(client){
    // Initialize client connection
    this.initializeClientConnection(client);

    // Connection close handler
    client.on('close', () => {
      //this.clients.splice(this.clients.indexOf(client));
      this.clients = this.clients.filter(item => item !== client);
      console.log(`${client.id} disconnected. Connected clients: ${this.clients.length}`);
      return;
    })
  }
}

const server = new Server(8080);
console.log('WebSocket server listening on Port 8080');
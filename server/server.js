const express = require('express');
const WebSocket = require('ws');
const DELIM = '\r\n';

/*
 * 'TRUE' -> true: Bool
 * 'FALSE' -> false: Bool
*/

class Server {
  constructor(port){
    this.server = new WebSocket.Server({ port: port });
    this.server.on('connection', this.handleConnection.bind(this));
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
  initializeClientConnection(client){
    // Generates a random serial for client-ID
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

    // Notify client of assigned ID and assign master/slave status
    let setAsMaster = false;
    if (!this.master){
      this.master = client;
      setAsMaster = true;
      console.log(`Setting system ${client.id} as Master System`);
    }
    this.sendInit(client, client.id, setAsMaster);
    console.log(`Client ${client.id} connected. Total clients: ${this.clients.length}`);
    return;
  }

  /**
   * Handles anything related to the connection between client and server
   * @param {ClientWebSocket} client 
   * @returns {null}
   */
  handleConnection(client){
    this.initializeClientConnection(client);

    // Close handler
    client.on('close', () => {
      if(client === this.master){
        this.sendBroadcast('ALERT: MASTER SYSTEM DISCONNECTED');
      }
      this.clients = this.clients.filter(item => item !== client);
      this.disconnected.push(client);
      console.log(`${client.id} disconnected. Connected clients: ${this.clients.length}`);
      return;
    });

    // Message handler
    // message: String
    client.on('message', (message) => {
      // automatically broadcast for now
      console.log(`Server received message ${message}`);
      this.sendBroadcast(message);
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
  getClientById(id){
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
  sendBroadcast(message){
    this.clients.forEach((client) => {
      client.send('BROADCAST' + DELIM + message);
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
  sendMessage(client, message){
    client.send('MESSAGE' + DELIM + message);
    return;
  }

  /**
   * Sends initialization package to client
   * @param {ClientWebSocket} client Client WebSocket Object
   * @param {String} id Server-assigned ID
   * @param {Bool} isMaster Signals if system is master or slave
   */
  sendInit(client, id, isMaster){
    client.send('INIT' + DELIM + id + DELIM + isMaster);
  }
}

const server = new Server(8080);
console.log('WebSocket server listening on Port 8080');
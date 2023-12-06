import { AiOutlineConsoleSql } from "react-icons/ai";
import { useState } from 'react';

/**
 * WebSocketService is what the client systems will use to communicate with the server
 */
const WebSocketService = {
  socket: null, // type ClientWebSocket
  ID: null, // type String
  isMaster: null, // type Bool
  menu: null, // type json object

  waitingOrders: [],
  workingOrders: [],
  finishedOrders: [],
  allOrders: [],

  /**
   * Establishes a WebSocket connection with the server
   * @param {String} hostname Hostname to use to connect to server. Defaults to '127.0.0.1'.
   * @param {String} port Port to use to connect to server. Defaults to 8080.
   */
  connect(hostname = '127.0.0.1', port = '8080', isMaster = false) {
    return new Promise((resolve, reject) => {
      /**
       * Establishes a connection to the server
       * @param {ClientWebSocket} socket 
       * @param {String} hostname 
       * @param {String} port 
       * @returns {Promise<[socket: ClientWebSocket, ID: String, isMaster: Bool]>}
       */

      function dispatchMenuUpdate(action) {
        const menuUpdateEvent = new CustomEvent('menuUpdate', {
          detail: { action },
        });
        window.dispatchEvent(menuUpdateEvent);
      }

      function dispatchOrderUpdate(orders) {
        const orderUpdateEvent = new CustomEvent('orderUpdate', {
          detail: {
            waitingOrders: orders.waitingOrders,
            workingOrders: orders.workingOrders,
            finishedOrders: orders.finishedOrders,
          }
        });
        window.dispatchEvent(orderUpdateEvent);
      }

      function connectToServer(hostname, port) {
        return new Promise((resolve, reject) => {
          const socket = new WebSocket(`ws://${hostname}:${port}`);
          var id = 'NO_ID';
          var menu = {};
          var allOrders = null;

          socket.addEventListener('open', (e) => {

          });

          // Connection message listener
          socket.addEventListener('message', (e) => {



            const payload = JSON.parse(e.data);
            let action = payload.action;
            switch (action) {
              case 'INIT':
                // Payload format: [id: String, isMaster: Bool]
                id = payload.ID;
                menu = payload.menu;
                allOrders = payload.allOrders;

                resolve([socket, id, menu, allOrders]);
                return;

              case 'BROADCAST':
                // Payload format: [message]
                alert(payload);
                break;

              case 'MESSAGE':
                // Payload format: [message]
                alert(payload);
                break;

              case 'MENU':
                WebSocketService.menu = payload.menuList;

                dispatchMenuUpdate('menuUpdate');
                break;

              case 'ORDERSUBMIT':
                const orders = payload.order;
                break;

              case 'ORDERPLACED':
                const message = payload.order;


                allOrders = payload.allOrders;
                WebSocketService.waitingOrders = payload.waitingOrders;
                WebSocketService.workingOrders = payload.workingOrders;
                WebSocketService.finishedOrders = payload.finishedOrders;




                dispatchOrderUpdate(allOrders);
                break;

              case 'ALLORDERS':

                dispatchOrderUpdate(allOrders);
                break;

              default:


                break;
            }
          });
        });
      };

      //this.socket = connectToServer(this.socket, hostname, port);
      connectToServer(hostname, port)
        .then(([socket, id, menu, allOrders]) => {

          this.socket = socket;
          this.id = id;
          this.menu = menu;
          this.allOrders = allOrders;
          console.log(menu)
          if (isMaster) {
            this.requestMaster();
            dispatchOrderUpdate(this.allOrders);
          }
          dispatchMenuUpdate('menuUpdate');
        });
    });
  },

  /**
   * Client sends a broadcast request to server
   * @param {String} message 
   * NOTE: Only master system should be allowed to use this function
   */
  broadcastMessage(message) {
    if (message) {
      const actionObject = {
        "action": "BROADCAST",
        "message": message,
      };

      this.socket.send(JSON.stringify(actionObject));
    }
  },

  submitOrder(order) {
    const actionObject = {
      'action': 'ORDER',
      'order': order,
    };

    this.socket.send(JSON.stringify(actionObject));
    return;
  },

  requestMaster() {
    const actionObject = {
      'action': 'REQUESTMASTER'
    };

    this.socket.send(JSON.stringify(actionObject));
    return;
  },

  requestOrders() {
    const actionObject = {
      'action': 'REQUESTORDERS'
    };
    this.socket.send(JSON.stringify(actionObject));
    return;
  },

  /**
   * Sends a actionObject request to the server
   * @param {ActionObject} actionObject
   */
  sendRequest(actionObject) {
    // testing actionObject


    this.socket.send(JSON.stringify(actionObject));
  },

  workOnItem(item) {
    const actionObject = {
      action: 'WORKONITEM',
      item: item
    };
    this.socket.send(JSON.stringify(actionObject));
  },

  finishItem(item) {
    const actionObject = {
      action: 'FINISHITEM',
      item: item
    };
    this.socket.send(JSON.stringify(actionObject));
  },

  addListener(callback) {
    this.listeners.push(callback);
  },

  notifyListeners(data) {
    this.listeners.forEach(callback => callback(data));
  }
};

export default WebSocketService;
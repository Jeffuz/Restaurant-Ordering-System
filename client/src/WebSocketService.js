import { AiOutlineConsoleSql } from "react-icons/ai";

/**
 * WebSocketService is what the client systems will use to communicate with the server
 */
const WebSocketService = {
  socket: null, // type ClientWebSocket
  ID: null, // type String
  isMaster: null, // type Bool

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
      function connectToServer(hostname, port) {
        return new Promise((resolve, reject) => {
          const socket = new WebSocket(`ws://${hostname}:${port}`);
          var id = 'NO_ID';

          socket.addEventListener('open', (e) => {
            console.log('WebSocket connection is open (connected).');
          });

          // Connection message listener
          socket.addEventListener('message', (e) => {

            function dispatchMenuUpdate(action, data) {
              const menuUpdateEvent = new CustomEvent('menuUpdate', {
                detail: { action, data },
              });
              window.dispatchEvent(menuUpdateEvent);
            }

            const payload = JSON.parse(e.data);
            let action = payload.action;
            console.log('ACTION:', payload);
            switch (action) {
              case 'INIT':
                // Payload format: [id: String, isMaster: Bool]
                console.log('Received INIT from server');
                id = payload.ID;
                console.log('ID SET');
                console.log(`id: ${id}`);

                resolve([socket, id]);
                return;

              case 'BROADCAST':
                // Payload format: [message]
                console.log('Received BROADCAST from server');
                alert(payload);
                break;

              case 'MESSAGE':
                // Payload format: [message]
                console.log('Received MESSAGE from server');
                alert(payload);
                break;

              case 'MENU':
                const menuList = payload.menuList;
                dispatchMenuUpdate('menuUpdate', menuList);
                break;

              case 'ORDERSUBMIT':
                const orders = payload.order;
                break;

              case 'ORDERPLACED':
                const message = payload.order;
                console.log(message);
                alert("received message:", message);
                break;


              default:
                console.log('ERROR: NO METHOD DETECTED IN MESSAGE');
                console.log(payload.message);
                break;
            }
          });
        });
      };

      //this.socket = connectToServer(this.socket, hostname, port);
      connectToServer(hostname, port)
        .then(([socket, id]) => {
          console.log("PROMISE RESOLVED", socket, id);
          this.socket = socket;
          this.id = id;
          if (isMaster){
            this.requestMaster();
          }
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
      console.log(this.socket);
      this.socket.send(JSON.stringify(actionObject));
    }
  },

  submitOrder(order) {
    const actionObject = {
      'action': 'ORDER',
      'order': order,
    };

    console.log(this.socket);
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

  /**
   * Sends a actionObject request to the server
   * @param {ActionObject} actionObject
   */
  sendRequest(actionObject) {
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
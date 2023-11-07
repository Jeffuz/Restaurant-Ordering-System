import { AiOutlineConsoleSql } from "react-icons/ai";

const DELIM = '\r\n';

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
  connect(hostname = '127.0.0.1', port = '8080') {
    /**
     * Establishes a connection to the server
     * @param {ClientWebSocket} socket 
     * @param {String} hostname 
     * @param {String} port 
     * @returns {[socket: ClientWebSocket, ID: String, isMaster: Bool]}
     */

    function connectToServer(hostname, port) {
      return new Promise((resolve, reject) => {
      const socket = new WebSocket(`ws://${hostname}:${port}`);
      var id = 'NO_ID';
      var isMaster = false;

      socket.addEventListener('open', (e) => {
        console.log('WebSocket connection is open (connected).');
      });

      // Connection message listener
      socket.addEventListener('message', (e) => {

        function dispatchMenuUpdate(action, data){
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
            isMaster = payload.isMaster === 'true';
            if(isMaster){
              console.log('DESIGNATED MASTER SYSTEM');
            }else{
              console.log('DESIGNATED SLAVE SYSTEM');
            }
            console.log(`id: ${id}`);
            console.log(`isMaster: ${isMaster}`);

            resolve([socket, id, isMaster]);
            break;

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

          case 'menuList':
            const menuList = payload.menuList;
            dispatchMenuUpdate('menuUpdate', menuList);
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
    .then(([socket, id, isMaster]) => {
      console.log(socket, id, isMaster);
      this.socket = socket;
      this.id = id;
      this.isMaster = isMaster;
    });
    //let out = ([this.socket, this.ID, this.isMaster] = connectToServer(hostname, port));
    //console.log('out', out);
  },

  /**
   * Client sends a broadcast request to server
   * @param {String} message 
   * NOTE: Only master system should be allowed to use this function
   */
  broadcastMessage(message) {
    /*if (message){
      console.log(`Sending broadcast request with message "${message}..."`);
      this.socket.send('BROADCAST' + DELIM + message);
    }*/
    if (message){
      const actionObject = {
        "action": "BROADCAST",
        "message": message,
      };
      console.log(this.socket);
      this.socket.send(JSON.stringify(actionObject));
    }
    return;
  },

  submitOrder(order){
    const actionObject = {
      'action': 'ORDER',
      'order': order,
    };

    console.log(this.socket);
    this.socket.send(JSON.stringify(actionObject));
    return;
  },

  /**
   * Sends a actionObject request to the server
   * @param {ActionObject} actionObject
   */
  sendRequest(actionObject) {
    this.socket.send(JSON.stringify(actionObject));
  }
};

export default WebSocketService;
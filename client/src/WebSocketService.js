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
      const socket = new WebSocket(`ws://${hostname}:${port}`);
      var id = 'NO_ID';
      var isMaster = false;

      socket.addEventListener('open', (e) => {
        console.log('WebSocket connection is open (connected).');
      })

      // Connection message listener
      socket.addEventListener('message', (e) => {
        let payload = e.data.split(DELIM);
        let method = payload.shift();
        switch (method) {
          case 'INIT':
            // Payload format: [id: String, isMaster: Bool]
            console.log('Received INIT from server');
            id = payload[0];
            isMaster = payload[1] === 'true';
            if(isMaster){
              alert('DESIGNATED MASTER SYSTEM');
            }else{
              alert('DESIGNATED SLAVE SYSTEM');
            }
            console.log(`id: ${id}`);
            console.log(`isMaster: ${isMaster}`);
            break;

          case 'BROADCAST':
            // Payload format: [message]
            console.log(`Received BROADCAST from server: ${payload}`);
            alert(payload);
            break;

          case 'MESSAGE':
            // Payload format: [message]
            console.log(`Received MESSAGE from server: ${payload}`);
            alert(payload);
            break;

          default:
            console.log(`ERROR: NO METHOD DETECTED IN MESSAGE ->${e.data}`);
            break;
        }
      });
    return [socket, id, isMaster];
    }

    //this.socket = connectToServer(this.socket, hostname, port);
    [this.socket, this.ID, this.isMaster] = connectToServer(hostname, port);



    // Connection creation listener
    /*this.socket.addEventListener('open', (e) => {
      console.log("WebSocket connection is open (connected)");
    });

    // Connection destruction listener
    this.socket.addEventListener('close', (e) => {
      console.log('Disconnected from Server');

      if(e.code === 1000){
        console.log('WebSocket connection closed gracefully.');
      }else{
        console.log(`WebSocket connection severed with code ${e.code}, Attempting to reconnect...`);
        setTimeout(() => {
          this.socket = new WebSocket(`ws://${hostname}:${port}`);
        }, 1000);
      }
    });

    // Connection message listener
    this.socket.addEventListener('message', (e) => {
      let payload = e.data.split(DELIM);
      let method = payload.shift();

      switch (method) {
        case 'INIT':
          // Payload format: [id: String, isMaster: Bool]
          console.log('Received INIT from server');
          this.ID = payload;
          this.isMaster = payload[1] === 'true';
          if(this.isMaster){
            alert('DESIGNATED MASTER SYSTEM');
          }else{
            alert('DESIGNATED SLAVE SYSTEM');
          }
          break;

        case 'BROADCAST':
          // Payload format: [message]
          console.log(`Received BROADCAST from server: ${payload}`);
          alert(payload);
          break;

        case 'MESSAGE':
          // Payload format: [message]
          console.log(`Received MESSAGE from server: ${payload}`);
          alert(payload);
          break;

        default:
          console.log(`ERROR: NO METHOD DETECTED IN MESSAGE ->${e.data}`);
          break;
      }
    });*/
  },

  /**
   * Client sends a broadcast request to server
   * @param {String} message 
   * NOTE: Only master system should be allowed to use this function
   */
  broadcastMessage(message) {
    if (message){
      console.log(`Sending broadcast request with message "${message}..."`);
      this.socket.send('BROADCAST' + DELIM + message);
    }
  },

  submitOrder(order){
    console.log('ORDER' + DELIM + order);
    this.socket.send('ORDER' + DELIM + order)
  }
};

export default WebSocketService;
const DELIM = '\r\n';

const WebSocketService = {
  socket: null, // type ClientWebSocket
  ID: null, // type String
  isMaster: null, // type Bool
  connect(hostname = '127.0.0.1', port = '8080') {
    this.socket = new WebSocket(`ws://${hostname}:${port}`);

    // Connection creation listener
    this.socket.addEventListener('open', () => {
      console.log("Connected to server");
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
          console.log(`Received INIT from server with id: ${payload}`);
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
    });
  },

  /**
   * Client sends a broadcast request to server
   * @param {String} message 
   * NOTE: Only master system should be allowed to use this function
   */
  broadcastMessage(message) {
    if (message){
      console.log(`Sending broadcast request with message "${message}..."`);
      this.socket.send(message);
    }
  }
};

export default WebSocketService;
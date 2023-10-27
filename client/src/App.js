import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home'
import Login from './pages/login';
import Menu from './pages/menu';
import Table from './pages/table';

// Websockets
import WebSocketService from './WebSocketService';

function App() {
  // Establish a connection if not already connected
  useEffect(() => {
    if (!WebSocketService.socket) {
      WebSocketService.connect();
    }
  }, []);

  // broadcastMessage() and crashConnection() are testing functions, don't use them in implementation
  function broadcastMessage(){
    const userInput = prompt('Input message');
    /*if (userInput){
      console.log(`Attempting to broadcast message ${userInput}...`);
      WebSocketService.socket.send(userInput);
    }*/
    WebSocketService.broadcastMessage(userInput);
  }
  function crashConnection(){
    WebSocketService.socket.close(3333, 'Abnormal Disconnect Test');
    return;
  }

  function submitOrder(){
    WebSocketService.submitOrder('Test order');
  }

  return (
    <div className="App">
      <button onClick={broadcastMessage}>Broadcast a message</button>
      <br />
      <button onClick={crashConnection}>Crash websocket connection</button>
      <br />
      <button onClick={submitOrder}>Submit the order</button>
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

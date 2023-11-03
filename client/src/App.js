import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home'
import Login from './pages/login';
import Menu from './pages/menu';
import Table from './pages/table';
import AdminMenu from './pages/admin-menu';
import NoPage from './pages/noPage';

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
    WebSocketService.broadcastMessage(userInput);
  }
  function crashConnection(){
    WebSocketService.socket.close(3333, 'Abnormal Disconnect Test');
    return;
  }

  function submitOrder(){
    WebSocketService.submitOrder('Test order');
    return;
  }

  function testId(){
    alert(WebSocketService.id);
  }

  return (
    <div className="App">
      <button onClick={testId}>test</button> <br />
      <button onClick={submitOrder}>Submit Order</button> <br />
      <button onClick={broadcastMessage}>Broadcast Message</button> <br /> 
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='/admin-menu' element={<AdminMenu WebSocketService={WebSocketService} />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Menu from './pages/menu';
import Table from './pages/table';
import NoPage from './pages/noPage';

import Admin_dashboard from './pages/admin-dashboard';
import Landing_page from './pages/landing-page';

// Websockets
import WebSocketService from './WebSocketService';

function App() {
  // Establish a connection if not already connected
  /*useEffect(() => {
    if (!WebSocketService.socket) {
      WebSocketService.connect();
    }
  }, []);*/

  // broadcastMessage() and crashConnection() are testing functions, don't use them in implementation
  function broadcastMessage() {
    const userInput = prompt('Input message');
    WebSocketService.broadcastMessage(userInput);
  }
  function crashConnection() {
    WebSocketService.socket.close(3333, 'Abnormal Disconnect Test');
    return;
  }

  function submitOrder() {
    WebSocketService.submitOrder('Test order');
    return;
  }

  function testId() {
    alert(WebSocketService.id);
  }

  return (
    <div className="App font-tt-norms-pro">
      <HashRouter>
        <Routes>
          <Route index element={<Landing_page />} />
          <Route path='/' element={<Landing_page />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='/admin-dashboard' element={<Admin_dashboard WebSocketService={WebSocketService} />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

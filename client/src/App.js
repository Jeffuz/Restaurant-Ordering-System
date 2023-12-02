import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/home'
import Menu from './pages/menu';
import Table from './pages/table';
import NoPage from './pages/noPage';

import Admin_dashboard from './pages/admin-dashboard';
import Admin_Menu from './pages/admin-menu';
import Admin_table from './pages/admin-table';
import Admin_orders from './pages/admin-orders';
import Admin_analytics from './pages/admin-analytics';
import Admin_customer from './pages/admin-customer';
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
      {/* <button onClick={testId}>test</button> <br />
      <button onClick={submitOrder}>Submit Order</button> <br />
      <button onClick={broadcastMessage}>Broadcast Message</button> <br />  */}
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='/admin-dashboard' element={<Admin_dashboard WebSocketService={WebSocketService}/>} />
          <Route path='*' element={<NoPage />} />
          <Route path='/landing-page' element={<Landing_page/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

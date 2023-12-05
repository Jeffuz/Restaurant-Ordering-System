import './App.css';
import React, {useState} from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Menu from './pages/menu';
import Table from './pages/table';
import NoPage from './pages/noPage';

import Admin_dashboard from './pages/admin-dashboard';
import Landing_page from './pages/landing-page';

// Websockets
import WebSocketService from './WebSocketService';

function App() {

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "115A's Diner",
    description: "Welcome to 115A's Diner, where passion meets flavor!",
    instagramLink: "https://www.instagram.com/your_instagram",
    facebookLink: "https://www.facebook.com/your_facebook",
    twitterLink: "https://twitter.com/your_twitter",
  });

  const updateRestaurantInfo = (newInfo) => {
    setRestaurantInfo(newInfo);
  };

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
          <Route index element={<Landing_page restaurantInfo={restaurantInfo}/>} />
          <Route path='/' element={<Landing_page restaurantInfo={restaurantInfo}/>} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='/admin-dashboard' element={<Admin_dashboard WebSocketService={WebSocketService} restaurantInfo={restaurantInfo}  updateRestaurantInfo={updateRestaurantInfo}/>} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

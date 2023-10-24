import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home'
import Login from './pages/login';
import Menu from './pages/menu';
import Table from './pages/table';
import NoPage from './pages/noPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home'
import Login from './pages/login';
import Menu from './pages/menu';
import Table from './pages/table';
<<<<<<< HEAD
import AdminMenu from './pages/admin-menu';
=======
import NoPage from './pages/noPage';
>>>>>>> main

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
<<<<<<< HEAD
          
          <Route path='/admin-menu' element={<AdminMenu />} />
=======
          <Route path='*' element={<NoPage />} />
>>>>>>> main
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/home'
import Login from './pages/login';
import Menu from './pages/menu';
import Table from './pages/table';
import NoPage from './pages/noPage';

import Admin_dashboard from './pages/admin-dashboard';
import Admin_Menu from './pages/admin-menu';
import Admin_table from './pages/admin-table';
import Admin_orders from './pages/admin-orders';
import Admin_analytics from './pages/admin-analytics';
import Admin_customer from './pages/admin-customer';
import AdminNavbar from './components/adminNavbar';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/table' element={<Table />} />
          <Route path='/admin-dashboard' element={<Admin_dashboard />} />
          <Route path='/admin-menu' element={<Admin_Menu />} />
          <Route path='/admin-table' element={<Admin_table />} />
          <Route path='/admin-orders' element={<Admin_orders />} />
          <Route path='/admin-analytics' element={<Admin_analytics />} />
          <Route path='/admin-customer' element={<Admin_customer />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

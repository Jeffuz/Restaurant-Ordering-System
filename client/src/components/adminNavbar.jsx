import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import { MdRestaurantMenu, MdTableRestaurant, MdBorderColor } from 'react-icons/md'
import { TbDeviceAnalytics } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'

const AdminNavbar = () => {
    const menuItems = [
        { label: 'Dashboard', icon: 'FaHome', to: '/admin-dashboard' },
        { label: 'Menu', icon: 'MdRestaurantMenu', to: '/admin-menu' },
        { label: 'Table', icon: 'MdTableRestaurant', to: '/admin-table' },
        { label: 'Orders', icon: 'MdBorderColor', to: '/admin-orders' },
        { label: 'Analytics', icon: 'TbDeviceAnalytics', to: '/admin-analytics' },
        { label: 'Customer', icon: 'CgProfile', to: '/admin-customer' },
    ];

    return (
        <div className='bg-white flex flex-col h-screen'>
            <div className='p-4 mx-auto text-4xl font-medium'><Link to='/'>115A's Diner</Link></div>
            <div className='flex flex-col gap-8 p-7'>
                {menuItems.map((item, index) => (
                    <Link className='flex items-center' to={item.to} key={index}>
                        <div className='flex gap-4 items-center'>
                            <span className='text-3xl'>{getIcon(item.icon)}</span>
                            <span className='text-2xl font-normal'>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const getIcon = (iconName) => {
    switch (iconName) {
        case 'FaHome':
            return <FaHome />;
        case 'MdRestaurantMenu':
            return <MdRestaurantMenu />;
        case 'MdTableRestaurant':
            return <MdTableRestaurant />;
        case 'MdBorderColor':
            return <MdBorderColor />;
        case 'TbDeviceAnalytics':
            return <TbDeviceAnalytics />;
        case 'CgProfile':
            return <CgProfile />;
        default:
            return null;
    }
};

export default AdminNavbar;

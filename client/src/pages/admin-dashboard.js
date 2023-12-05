import React, { useEffect } from 'react'
import AdminNavbar from '../components/adminNavbar'
import { useState } from 'react';
import Admin_Menu from './admin-menu';
import Admin_analytics from './admin-analytics';
import Admin_customer from './admin-customer';
import Admin_table from './admin-table';
import Admin_orders from './admin-orders';

const Admin_dashboard = (props) => {

    const [page, setPage] = useState("Dashboard");

    const {WebSocketService} = props

    useEffect(() => {
        if (!WebSocketService.socket){
            WebSocketService.connect('127.0.0.1', '8080', true)
            .then(alert("Connected!"));
        }
    }, []);

    if (page === "Dashboard"){
        return (
            <>
                <div className="flex flex-row">
                    <div className='w-[20%]'><AdminNavbar setPage={setPage}/></div>
                    <div className="w-[80%] h-screen">
                        <div className='flex flex-col'>
                            <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Dashboard</div>
                            <div>{/* Component */}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (page === "Menu"){
        return <Admin_Menu WebSocketService={WebSocketService} setPage = {setPage} />;
    }
    else if (page === "Analytics"){
        return <Admin_analytics WebSocketService={WebSocketService} setPage = {setPage} />;
    }
    else if (page === "Customer"){
        return <Admin_customer WebSocketService={WebSocketService} setPage = {setPage} restaurantInfo={props.restaurantInfo} updateRestaurantInfo={props.updateRestaurantInfo}/>;
    }
    else if (page === "Orders"){
        return <Admin_orders WebSocketService={WebSocketService} setPage = {setPage} />;
    }
    else if (page === "Table"){
        return <Admin_table WebSocketService={WebSocketService} setPage = {setPage} />;
    }
    
}

export default Admin_dashboard
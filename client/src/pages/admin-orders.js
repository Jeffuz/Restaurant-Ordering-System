import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/adminNavbar'
import OrderManager from '../components/orderManager'

const Admin_orders = (props) => {

    const { WebSocketService, setPage } = props;

    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar setPage={setPage}/></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col h-screen'>
                        <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Orders</div>

                        <div>{/* Component */}</div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_orders
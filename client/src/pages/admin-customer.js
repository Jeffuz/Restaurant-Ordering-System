import React from 'react'
import AdminNavbar from '../components/adminNavbar'
import EditRestaurant from '../components/editRestaurant'

const Admin_customer = ( props ) => {
    const { WebSocketService, setPage, restaurantInfo, updateRestaurantInfo } = props;

    //const { WebSocketService, setPage } = props;
    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar setPage={props.setPage}/></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col'>
                        <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Customer</div>
                        <div><EditRestaurant restaurantInfo={props.restaurantInfo} updateRestaurantInfo={props.updateRestaurantInfo}/></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_customer
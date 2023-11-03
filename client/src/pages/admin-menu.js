import React from 'react'
import MenuManager from '../components/admin-menu/MenuManager'
import AdminNavbar from '../components/adminNavbar';

const AdminMenu = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar /></div>
                <div className="w-[80%] h-screen px-8">
                    <MenuManager />
                </div>
            </div>


        </div>


    )
}

export default AdminMenu;
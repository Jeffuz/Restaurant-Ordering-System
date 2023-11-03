import React from 'react'
import MenuManager from '../components/admin-menu/MenuManager'
import AdminNavbar from '../components/adminNavbar';
const AdminMenu = () => {
    return(
        <div>
            <div className="flex flex-row"> 
                <AdminNavbar/>
                <div className="w-[80%]"> {/* Adjust the width as needed */}
                    <MenuManager />
                </div>
            </div>


        </div>

       
    )
}

export default AdminMenu;
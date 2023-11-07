import React from 'react'
import MenuManager from '../components/admin-menu/MenuManager'
import AdminNavbar from '../components/adminNavbar';

const Admin_Menu = (props) => {
    const { WebSocketService } = props;

    return(
        <div>
            <div className="flex flex-row"> 
                <AdminNavbar/>
                <div className="w-[80%]"> {/* Adjust the width as needed */}
                    <MenuManager WebSocketService={WebSocketService} />
                </div>
            </div>
        </div>
    )
}

export default Admin_Menu;
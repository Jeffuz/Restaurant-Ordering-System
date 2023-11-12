import React from 'react'
import AdminNavbar from '../components/adminNavbar'
import AdminTableManager from '../components/table-selection/admin-table-selection/AdminTableManager'
const Admin_table = () => {
    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar /></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col'>
                        <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Table</div>
                        <div>
                            <AdminTableManager/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_table
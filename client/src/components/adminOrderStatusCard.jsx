import React from 'react'

const AdminOrderStatusCard = ({ tasks }) => {
    return (
        <>
            <div className='flex justify-center bg-gray-100 m-6 p-6'>
                <div>{tasks.content}</div>
            </div>
        </>
    )
}

export default AdminOrderStatusCard 
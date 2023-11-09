import React from 'react'

const OrderManager = () => {
    return (
        <>
            <div className='grid grid-cols-3 h-full gap-8 mx-8 mb-8'>
                <div className='bg-white rounded-md'>
                    <div className='p-5 font-bold text-3xl'>Order's Pending</div>
                </div>
                <div className='bg-white rounded-md'>
                    <div className='p-5 font-bold text-3xl'>Processing Order's</div>

                </div>
                <div className='bg-white rounded-md'>
                    <div className='p-5 font-bold text-3xl'>Completed Order's</div>
                </div>
            </div>
        </>
    )
}

export default OrderManager
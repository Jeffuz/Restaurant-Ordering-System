import React from 'react'
// import SelectTable from '../components/table-selection/SelectTable' 
import CustomerTable from '../components/table-selection/customer-table-selection/CustomerTable'
const Table = () => {
    return (
        <div>
            <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Table</div>
            <div className="flex flex-col items-center">
                <CustomerTable/>
            </div>
            


        </div>
        
    )
}

export default Table
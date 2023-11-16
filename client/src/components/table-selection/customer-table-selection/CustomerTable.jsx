import {React, useState, useEffect} from 'react'
import CustomerTableStatus from '../customer-table-selection/CustomerTableStatus'


const CustomerTable = () => {

    const [tables, setTables] = useState([
        { id: 1, status: 'available', seats: 4 },
        { id: 2, status: 'unavailable', seats: 6 },
        { id: 3, status: 'unavailable', seats: 2 },
        { id: 4, status: 'available', seats: 2 },
        { id: 5, status: 'unavailable', seats: 4 },
        
    ]);



    return(
        <div>

           Select your Table:

           <CustomerTableStatus tablesNum={tables}/>
           
        </div>

    );
}

export default CustomerTable;
import {React, useState, useEffect} from 'react'
import CustomerTableStatus from './CustomerTableStatus'


const CustomerTable = () => {

    //initial tables 
    const [tables, setTables] = useState([
        { id: 1, number: 1, status: 'available', seats: 4 },
        { id: 2, number: 2, status: 'unavailable', seats: 6 },
        { id: 3, number: 3, status: 'unavailable', seats: 2 },
        { id: 4, number: 4, status: 'available', seats: 2 },
        { id: 5, number: 5, status: 'unavailable', seats: 4 },
        { id: 6, number: 6, status: 'available', seats: 8 },
        { id: 7, number: 7, status: 'available', seats: 8 },
        
    ]);

    return(
        <div className="flex flex-col items-center justify-content">
           <CustomerTableStatus tablesNum={tables}/>
        </div>
    );
}

export default CustomerTable;
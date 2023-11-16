import {React, useState} from 'react';
import SetTables from '../admin-table-selection/SetNumTable.jsx'
import TableGrid from '../admin-table-selection/TableStatusGrid.jsx'

const AdminTableManager = () => {

    const [totalTables, setTotalTables] = useState(null); // updates with number of tables 
    const [tableStatus, setTableStatus] = useState([]);

    const handleTotalTablesSubmit = (total) => {
        const initialTableStatus = Array.from({ length: total }, (_, index) => ({
            id: index + 1,
            status: 'available', 
          }));
      
          setTotalTables(total);
          setTableStatus(initialTableStatus);

    }

    const handleEditTableStatus = (tableId, currentStatus) => {
        
        console.log(`Table ${tableId} status changed from ${currentStatus}`);
    };

    const handleRemoveTable = (tableId) => {
        setTableStatus((prevTableStatus) =>
            prevTableStatus.filter((table) => table.id !== tableId)
        );
    }

    return(

        <div>
            

            <div className="main">
                {totalTables ? (
                        <TableGrid tableStatus={tableStatus} onEdit={handleEditTableStatus} onRemove={handleRemoveTable}/>


                    ): (
                        <SetTables 
                            onTotalTablesSubmit={handleTotalTablesSubmit}
                    
                        />



                    )


                }
            </div>
            
        </div>
        


        
    )
}

export default AdminTableManager;
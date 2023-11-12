import {React, useState} from 'react';
import SetTables from '../admin-table-selection/SetNumTable.jsx'
import TableGrid from '../admin-table-selection/TableStatusGrid.jsx'

const AdminTableManager = () => {

    const [totalTables, setTotalTables] = useState(null); // updates with number of tables 


    const handleTotalTablesSubmit = (total) => {
        setTotalTables(total);

    }

    return(

        <div>
            <h1>Set the Tables</h1>

            <div className="main">
                {totalTables ? (
                        <TableGrid numTables={totalTables}/>


                    ): (
                        <SetTables 
                            onTotalTablesSubmit={handleTotalTablesSubmit}
                            totalTables={totalTables}
                            onSetTables={setTotalTables}
                        />



                    )


                }
            </div>
            
        </div>
        


        
    )
}

export default AdminTableManager;
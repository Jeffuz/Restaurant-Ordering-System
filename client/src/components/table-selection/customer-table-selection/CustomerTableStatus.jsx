import {React, useState} from 'react'
import CustomerTableButton from '../customer-table-selection/CustomerTableButton'

const CustomerTableStatus = ({tablesNum}) => {
    const [selectedTableId, setSelectedTableId] = useState(null);
    
    // if the table is selected then update the selected table with the table given 
    const handleTableSelect = (tableId, action) => {

        if (action === 'selected'){
            setSelectedTableId(tableId)
            console.log("table selected")

        }else if (action === 'deselected'){
            setSelectedTableId(null)
            console.log("table deselected")

        }
    }

    return(
  

        <div className="grid grid-cols-3 gap-4">
            {tablesNum.map((table) => (
                <CustomerTableButton 
                    key={table.id} 
                    table={table} 
                    onTableSelect={handleTableSelect}
                    isSelected = {table.id === selectedTableId}
                    isDisabled = {selectedTableId !== null && table.id !== selectedTableId} />
            ))}
        </div>
 

    );
}

export default CustomerTableStatus;
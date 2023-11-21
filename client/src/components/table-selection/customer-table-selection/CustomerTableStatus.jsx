import {React, useState} from 'react'
import CustomerTableButton from '../customer-table-selection/CustomerTableButton'

const CustomerTableStatus = ({tablesNum}) => {
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedTableNum, setSelectedTableNum] = useState(null);
    // if the table is selected then update the selected table with the table given 
    const handleTableSelect = (tableId, action) => {

        if (action === 'selected'){
            setSelectedTableId(tableId);
           
        }else if (action === 'deselected'){
            setSelectedTableId(null)
          
        }
    }

    return(
        <div className="flex flex-col items-center justify-content bg-white p-8 md:rounded-lg">
        
            <p className="text-xl mb-4">Select your Table:</p>
          
            
            <div className="grid grid-cols-3 gap-4 ">
                {tablesNum.map((table) => (
                    <CustomerTableButton 
                        key={table.id} 
                        table={table} 
                        onTableSelect={handleTableSelect}
                        isSelected = {table.id === selectedTableId}
                        isDisabled = {selectedTableId !== null && table.id !== selectedTableId} />
                ))}
            </div>
        </div>
        
    );
}

export default CustomerTableStatus;
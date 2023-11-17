import {React, useState} from 'react'
import TableSelectionModal from '../customer-table-selection/TableSelectionModal'
const CustomerTableButton = ({table, onTableSelect, isSelected, isDisabled}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleButtonClick = () => {
        // only opens modal for table selection if the table is available
        if (table.status === 'available') {
          setIsModalOpen(true);
        }
      }
    return(

        <div>

            <>
                <button
                    onClick={handleButtonClick}
                    className={`p-4 border ${
                        isSelected ? 'bg-blue-500 text-white': 
                            (table.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                    }`}
                    disabled={isDisabled || table.status === 'unavailable'} 
                >
                    {`Table ${table.id}`}
                </button>

                
                {isModalOpen && (
                    <TableSelectionModal
                        table={table}
                        onTableSelect={onTableSelect}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </>

            

        </div>

    );
}

export default CustomerTableButton;
import {React, useState, useEffect, useCallback} from 'react';
import SetTables from '../admin-table-selection/SetNumTable.jsx'
import TableGrid from '../admin-table-selection/TableStatusGrid.jsx'
import TableEditModal from '../admin-table-selection/TableEditModal'
const AdminTableManager = () => {

    //populate table grid
    const [totalTables, setTotalTables] = useState(null); // updates with number of tables 
    const [tableStatus, setTableStatus] = useState([]);

    //select tale for edits
    const [selectedTable, setSelectedTable] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    //add table 
    const [isAddTableOpen, setIsAddTableOpen] =  useState(false);


    const handleAddTableButtonClick = () => {
        setIsEditModalOpen(true);

    }

    const handleAddTableButtonClose = () => {
        setIsEditModalOpen(false);


    }
    const handleEditTableButtonClick = (table) => {
        setSelectedTable(table);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedTable(null);
    };

    const handleTotalTablesSubmit = (total) => {
        const initialTableStatus = Array.from({ length: total }, (_, index) => ({
            id: index + 1,
            status: 'available', 
            seats: 4,
          }));
      
          setTotalTables(total);
          setTableStatus(initialTableStatus);

    }

    const handleEditTableStatus = (tableId, editedStatus, editedSeats) => {
        
        setTableStatus((prevTableStatus) => {
            
            const updatedTableStatus = prevTableStatus.map((table) =>
                table.id === tableId ? { ...table, status: editedStatus, seats: editedSeats } : table
            );
           
            return updatedTableStatus;
        });
    
    
    }

    const handleRemoveTable = (tableId) => {
        setTableStatus((prevTableStatus) =>
            prevTableStatus.filter((table) => table.id !== tableId)
        );
    }
    return(

        <div>
            <div className="main">
                {totalTables ? (
                        
                        <TableGrid 
                            tableStatus={tableStatus} 
                            onEdit={handleEditTableStatus} 
                            onRemove={handleRemoveTable}
                            onEditButtonClick={handleEditTableButtonClick}
                        />

                    ): (
                        <SetTables 
                            onTotalTablesSubmit={handleTotalTablesSubmit}
                        />

                    )
                   
                
                }

                <button className="button-table" onClick={handleAddTableButtonClick}> Add Table </button>

                {isAddTableOpen &&(
                    <TableEditModal
        
                        onClose={handleAddTableButtonClose}
                        onEdit={handleEditTableStatus}
                        onRemove={handleRemoveTable}
                    />

                )}
                
                {isEditModalOpen && selectedTable && (
                    <TableEditModal
                        table={selectedTable}
                        onClose={handleEditModalClose}
                        onEdit={handleEditTableStatus}
                        onRemove={handleRemoveTable}
                    />
                )}
            </div>
        </div>
    )
}

export default AdminTableManager;
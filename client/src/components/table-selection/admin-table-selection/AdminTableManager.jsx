import {React, useState, useEffect, useCallback} from 'react';
import SetTables from '../admin-table-selection/SetNumTable.jsx'
import TableGrid from '../admin-table-selection/TableStatusGrid.jsx'
import TableEditModal from '../admin-table-selection/TableEditModal'
const AdminTableManager = () => {

    //populate table grid
    const [totalTables, setTotalTables] = useState(null); // updates with number of tables 
    const [tableStatus, setTableStatus] = useState([]);

    //select table for edits
    const [selectedTable, setSelectedTable] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    //add table 
    const [isAddTableOpen, setIsAddTableOpen] =  useState(false);

    //check if tables have been added 
    const [tablesEntered, setTablesEntered] = useState(false);


    //open modal for add table
    const handleAddTableButtonClick = () => {
        setIsAddTableOpen(true);

    }

    //close modal for add table
    const handleAddTableButtonClose = () => {
        setIsAddTableOpen(false);


    }


    //add the table to the table array
    const handleAddTable = (newTable) => {
        // add the new table to the existing tableStatus
        setTableStatus((prevTableStatus) => [...prevTableStatus, newTable]);
        setIsAddTableOpen(false);
    };

    //edit the table selected 
    const handleEditTableButtonClick = (table) => {
        setSelectedTable(table);
        setIsEditModalOpen(true);
    };

    //close the table editing modal 
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedTable(null);
    };


    //add tables based on total entered by admin
    const handleTotalTablesSubmit = (total) => {
        const initialTableStatus = Array.from({ length: total }, (_, index) => ({
            id: index + 1,
            status: 'available', 
            seats: 4,
          }));
      
          setTotalTables(total);
          setTableStatus(initialTableStatus);
          setTablesEntered(true);

    }

    //edit the table based on the states provided
    const handleEditTableStatus = (tableId, editedStatus, editedSeats) => {
        
        setTableStatus((prevTableStatus) => {
            
            const updatedTableStatus = prevTableStatus.map((table) =>
                table.id === tableId ? { ...table, status: editedStatus, seats: editedSeats } : table
            );
           
            return updatedTableStatus;
        });
    
    
    }

    //filter out the table to be removed
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

                {tablesEntered && (
                        <button className="button-table" onClick={handleAddTableButtonClick}> Add Table </button>

                    )

                }

                {isAddTableOpen &&(
                    <TableEditModal
        
                        onClose={handleAddTableButtonClose}
                        onSave={handleAddTable}
                        onRemove={handleRemoveTable}
                        isNewTable
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
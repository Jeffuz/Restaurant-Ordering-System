import React, { useState } from 'react';
import TableEditModal from '../admin-table-selection/TableEditModal';
const TableButton = ({ table, onEdit, onRemove }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleEditClick = () => {
   
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    return (
        <div className="mb-4 p-2">
          <button
            className={`table-button w-20 h-20 text-lg whitespace-normal ${table.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            onClick={handleEditClick}
          >
            {`Table ${table.id} - ${table.status}`}
          </button>

          {isModalOpen && (
            <TableEditModal
              table={table}
              onClose={handleModalClose}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )}
        </div>
      );


}

export default TableButton
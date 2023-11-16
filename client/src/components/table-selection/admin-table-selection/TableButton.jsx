import React, { useState } from 'react';

const TableButton = ({ key, tableId, status, onEdit, onRemove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedStatus, setEditedStatus] = useState(status);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    const handleSaveClick = () => {
        onEdit(tableId, editedStatus);
        setIsEditing(false);
    };

    const handleStatusChange = () => {
        setEditedStatus((prevStatus) => (prevStatus === 'available' ? 'unavailable' : 'available'));
      };

    const handleRemoveClick = () => {
        onRemove(tableId);
    };

    return (
        <div className="mb-4 p-2">
          <button
            className={`table-button w-20 h-20 text-lg whitespace-normal ${editedStatus === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            onClick={isEditing ? handleStatusChange : handleEditClick}
          >
            {`Table ${tableId} - ${editedStatus}`}
          </button>

          {isEditing && (
            <>
                <button className="edit-button ml-2" onClick={handleSaveClick}>
                    Save
                </button>
                <button className="remove-button ml-2" onClick={handleRemoveClick}>
                    Remove
                </button>

            </>
            
            
           )}
        </div>
      );


}

export default TableButton
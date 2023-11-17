// TableEditModal.js
import React, { useState, useEffect } from 'react';

const TableEditModal = ({ table, onClose, onEdit, onRemove }) => {
  const [editedTable, setEditedTable] = useState({ ...table });

  useEffect(() => {
    setEditedTable({ ...table });
  }, [table]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTable((prevTable) => ({ ...prevTable, [name]: value }));
  };

  const handleSaveClick = () => {
    onEdit(editedTable);
    onClose();
  };

  const handleRemoveClick = () => {
    onRemove(editedTable.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h3 className="text-2xl font-semibold mb-4">{`Edit Table ${editedTable.id}`}</h3>

        <label className="block mb-4">
          Table Name:
          <input
            type="text"
            name="name"
            value={editedTable.name}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full"
          />
        </label>

        <label className="block mb-4">
          Availability:
          <select
            name="status"
            value={editedTable.status}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          onClick={handleSaveClick}
        >
          Save Changes
        </button>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={handleRemoveClick}
        >
          Remove Table
        </button>

        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TableEditModal;

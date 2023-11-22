// TableEditModal.js
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const TableEditModal = ({ table, onClose, onSave, onEdit, onRemove, isNewTable }) => {
  const [editedTable, setEditedTable] = useState({ ...table });
  


  const handleSaveClick = () => {
    if (isNewTable) {
      const newTable = { id: Date.now(), ...editedTable };
      onSave(newTable);
    } else {
      onEdit(editedTable.id, editedTable.status, editedTable.seats, editedTable.number); 
    }// Update the tableStatus directly
    onClose();
  };

  const handleInputChange = (e) => {
   
    const { name, value } = e.target;
     console.log("making changes to ", name, value)
    setEditedTable((prevTable) => ({ ...prevTable, [name]: value }));
  };


  const handleRemoveClick = () => {
    onRemove(editedTable.id);
    onClose();
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
      <div className="bg-white p-8  rounded-3xl">
        <div className="flex justify-end">
          <button
              // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md ml-2"
              onClick={onClose}
              className="rounded-md ml-auto"
          >
              <RxCross1 />
          </button>
        </div>
       
        {table ? (
          <h3 className="text-2xl font-semibold mb-4">{`Edit Table ${table.number}`}</h3>
        ):(
          <h3 className="text-2xl font-semibold mb-4">{`Add Table `}</h3>
        )}
        
        <label className="block mb-4">
          Table Number:
          <input
            type="number"
            name="number"
            value={editedTable.number}
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
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
          </select>
        </label>

        <label className="block mb-4">
          Seats:
          <input
            type="number"
            name="seats"
            value={editedTable.seats}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full"
          >
          </input>
        </label>

        <div className="buttons flex flex-row">
          <button
            className="bg-[#D9D9D9] text-black font-semibold py-2 px-6 rounded-md mr-2 text-center text-xl  flex items-center space-x-2"
            onClick={handleSaveClick}
          >
            <FaCheckCircle className="mr-2" />
            Save
          </button>

          <button
            className="bg-[#D9D9D9] text-black font-semibold py-2 px-6 rounded-md mr-2 text-center text-xl  flex items-center space-x-2"
            onClick={handleRemoveClick}
          >
            <BsTrashFill className="mr-2"/>
            Delete
          </button>


        </div>
       
      </div>
    </div>
  );
};

export default TableEditModal;

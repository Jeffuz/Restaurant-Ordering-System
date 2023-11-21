import React, { useState } from 'react';
import TableEditModal from '../admin-table-selection/TableEditModal';
import { MdPeopleAlt } from "react-icons/md";
const TableButton = ({ table, onEditButtonClick }) => {

    const handleEditClick = () => {
      onEditButtonClick(table);
    };

    return (
        <div className="mb-4 p-2 ">
          <button
            className={`table-button shadow-md flex flex-col items-center justify-center rounded-lg w-20 h-20 text-lg whitespace-normal  hover:ring-2 hover:ring-white 
              ${table.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            onClick={handleEditClick}
          >
            <p>Table {table.number} </p>
            <div className="flex flex-row text-center text-xl flex items-center space-x-2">
              <MdPeopleAlt  className="mr-2" />
              {`${table.seats}`}
            </div> 
          </button>
        </div>
      );
}

export default TableButton
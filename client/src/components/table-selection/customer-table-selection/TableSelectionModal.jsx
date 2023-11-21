import React from 'react';
import { RxCross1 } from "react-icons/rx";

const TableSelectionModal = ({ table, onTableSelect, onClose }) => {
  if (!table) {
    return null;
  }

  const handleSelectTable = () => {
    onTableSelect(table.id, 'selected');
    onClose();
  };

  const handleDeselectTable = () => {
    onTableSelect(table.id, 'deselected');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white p-8 rounded-md">
        <div className="flex justify-end">


          <button
              // className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md ml-2"
              onClick={onClose}
              className="rounded-md ml-auto"
          >
              <RxCross1 />
          </button>
        </div>

        
        <h3 className="text-2xl font-semibold mb-4">{`Table ${table.id} Details`}</h3>
        <h4>{`Availability: ${table.status === 'available' ? 'Available' : 'Unavailable'}`}</h4>
        <h4>{`Seats: ${table.seats}`}</h4>

        {table.status === 'available' && (
          <>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleSelectTable}
            >
              Select
            </button>

            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={handleDeselectTable}
            >
              Deselect
            </button>

          </>
        
        )}

      </div>
    </div>
  );
};

export default TableSelectionModal;

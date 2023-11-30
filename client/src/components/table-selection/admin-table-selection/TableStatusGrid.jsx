// TableStatusGrid.js
import React, {useState, useEffect} from 'react';
import TableButton from '../admin-table-selection/TableButton';
const TableStatusGrid = ({ tableStatus, onRemove, onEditButtonClick }) => {

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl h-[40rem]">
      {/* <h2 className="text-xl/8 fontFamily">Edit Tables</h2> */}
      <div className="grid grid-cols-3 gap-4 overflow-auto">
        {tableStatus.map((table) => (
            <TableButton
              key={table.id}
              table={table}
              onRemove={() => onRemove(table.id)}
              onEditButtonClick={onEditButtonClick}
            />
          ))}
      </div>
    </div>
  );
};

export default TableStatusGrid;

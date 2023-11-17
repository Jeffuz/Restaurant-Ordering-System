// TableStatusGrid.js
import React, {useState} from 'react';
import TableButton from '../admin-table-selection/TableButton';
import TableEditModal from '../admin-table-selection/TableEditModal';
const TableStatusGrid = ({ tableStatus, onEdit, onRemove }) => {

  return (
    <div>
      <h2>Table Status</h2>
      <div className="table-grid flex flex-row ">
        {tableStatus.map((table) => (
            <TableButton
              key={table.id}
              table={table}
              onEdit={() => onEdit(table.id, table.status)}
              onRemove={() => onRemove(table.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default TableStatusGrid;

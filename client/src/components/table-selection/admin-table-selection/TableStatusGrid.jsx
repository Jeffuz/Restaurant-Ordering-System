// TableStatusGrid.js
import React from 'react';
import TableButton from '../admin-table-selection/TableButton';

const TableStatusGrid = ({ tableStatus, onEdit, onRemove }) => {
  return (
    <div>
      <h2>Table Status</h2>
      <div className="table-grid flex flex-row ">
        {tableStatus.map((table) => (
          <TableButton
            key={table.id}
            tableId={table.id}
            status={table.status}
            onEdit={() => onEdit(table.id, table.status)}
            onRemove={()=> onRemove(table.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TableStatusGrid;

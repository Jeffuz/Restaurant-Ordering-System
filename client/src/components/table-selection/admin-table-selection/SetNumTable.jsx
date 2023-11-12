import React from 'react';

const SetNumTables = ({ onTotalTablesSubmit, totalTables, onSetTables }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onTotalTablesSubmit(totalTables);
  };

  return (
    <div>
      <h1>setting initial </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter # Tables:
          <input
            type="number"
            value={totalTables}
            onChange={(e) => onSetTables(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SetNumTables;

import React, {useState} from 'react';

const SetNumTables = ({ onTotalTablesSubmit }) => {
  const [totalTables, setTotalTables] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (totalTables > 0) {
      onTotalTablesSubmit(totalTables);
    } else {
      alert('Please enter a valid number of tables.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Set Total Tables:
        <input
          type="number"
          value={totalTables}
          onChange={(e) => setTotalTables(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SetNumTables;

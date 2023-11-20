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
    <div className=" fixed inset-0 flex items-center justify-center">
      <form className="text-xl/8 flex flex-col " onSubmit={handleSubmit}>
        <label className="text-xl/8 fontFamily flex flex-col items-center ">
          <p>Enter Number of Tables </p>
          <input
            type="number"
            value={totalTables}
            onChange={(e) => setTotalTables(e.target.value)}
            className="w-96 rounded-lg"
          />
        </label>
        <button className="bg-red-200 rounded-lg" type="submit">Submit</button>
      </form>
    </div>
   
  );
}

export default SetNumTables;

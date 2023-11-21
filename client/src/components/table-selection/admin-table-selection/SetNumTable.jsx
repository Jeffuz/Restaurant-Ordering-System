import React, {useState} from 'react';
import { GrLinkNext } from "react-icons/gr";
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
    <div className=" flex items-center justify-center h-screen">
      <form className="text-xl/8 flex flex-col " onSubmit={handleSubmit}>
        <label className="text-xl/8 fontFamily flex flex-col items-center ">
          <p className="mb-4">Enter Number of Tables </p>
          <div className="flex item-center">
            <input
              type="number"
              value={totalTables}
              onChange={(e) => setTotalTables(e.target.value)}
              className="w-96 rounded-lg"
            />
            <button className="bg-grey-200 rounded-lg ml-2 p-2" type="submit">
                <GrLinkNext />
            </button>

          </div>
        
        </label>
        
      </form>
    </div>
   
  );
}

export default SetNumTables;

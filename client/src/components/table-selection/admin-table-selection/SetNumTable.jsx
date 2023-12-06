import React, { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
const SetNumTables = ({ onTotalTablesSubmit }) => {
  const [totalTables, setTotalTables] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalTables > 0) {
      onTotalTablesSubmit(totalTables);
    } else {
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <form
        className="text-xl/8 flex flex-col bg-white shadow-lg p-8 rounded-3xl"
        onSubmit={handleSubmit}
      >
        <label className="text-xl/8 fontFamily flex flex-col items-center  ">
          <p className="mb-4">Enter Number of Tables </p>
          <div className="flex item-center">
            <input
              type="number"
              value={totalTables}
              onChange={(e) => setTotalTables(e.target.value)}
              className="w-70 shadow appearance-none border rounded-lg focus:shadow-outline"
            />
            <button className="bg-grey-200 rounded-lg ml-2 p-2" type="submit">
              <FaCircleArrowRight />
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default SetNumTables;

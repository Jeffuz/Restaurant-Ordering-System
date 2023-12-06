import { React, useState } from "react";
import TableSelectionModal from "../customer-table-selection/TableSelectionModal";
import { MdPeopleAlt } from "react-icons/md";

const CustomerTableButton = ({
  table,
  onTableSelect,
  isSelected,
  isDisabled,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // open the modal for table selection only if available
  const handleButtonClick = () => {
    // only opens modal for table selection if the table is available
    if (table.status === "available") {
      setIsModalOpen(true);
    }
  };
  return (
    <div className=" mb-4 p-2 ">
      <>
        <button
          onClick={handleButtonClick}
          className={`flex shadow-md flex-col items-center justify-center rounded-lg w-20 h-20 text-lg whitespace-normal 
                    ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : table.status === "available"
                          ? "bg-green-500 text-white hover:ring-2 hover:ring-blue"
                          : "bg-red-500 text-white"
                    }`}
          disabled={isDisabled || table.status === "unavailable"}
        >
          <p>Table {table.number}</p>

          <div className="flex flex-row text-center text-lg flex items-center space-x-2">
            <MdPeopleAlt className="mr-2" />
            {table.seats}
          </div>
        </button>

        {isModalOpen && (
          <TableSelectionModal
            table={table}
            onTableSelect={onTableSelect}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    </div>
  );
};

export default CustomerTableButton;

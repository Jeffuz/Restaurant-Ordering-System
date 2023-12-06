import React from "react";
import AddCircle from "../admin-menu/add-circle.png";
const AddButtonCard = ({ onClick }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-full">
        <img src={AddCircle} className="w-101 h-101" />
      </div>
    </div>
  );
};

export default AddButtonCard;

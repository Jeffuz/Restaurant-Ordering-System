import React from 'react';
import AddCircle from '../admin-menu/add-circle.png'
const AddButtonCard = ({ onClick }) => {
  return (
    <div
      className="w-56 h-72 flex-shrink-0 rounded-lg border bg-white shadow-md m-4"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center justify-center h-full">
        <img src={AddCircle} className="w-101 h-101"/>
        
      </div>
    </div>
  );
};

export default AddButtonCard;
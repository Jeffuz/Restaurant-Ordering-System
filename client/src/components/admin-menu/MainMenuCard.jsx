
import React from 'react';

const MainMenuCard = ({ item, onCardClick }) => {
  return (
    <div className="menu-card p-4 m-2 bg-white rounded-lg shadow-md" onClick={() => onCardClick(item)}>
      <img src={item.photo} alt={item.name} className="w-full h-40 object-cover rounded-t-lg"  />
      <div className="p-4">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
      </div>
      
    </div>
  );
};

export default MainMenuCard;

import React from 'react';

const MainMenuCard = ({ item, onCardClick }) => {

  
  return (
    <div className="menu-card w-56 h-72 flex-shrink-0 rounded-lg border bg-white shadow-md m-4" onClick={() => onCardClick(item)}>
      <img src={item.photo} alt={item.name} className="w-full h-40 object-cover rounded-t-lg"  />
      <div className="p-4">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
      </div>
      
    </div>
  );
};

export default MainMenuCard;
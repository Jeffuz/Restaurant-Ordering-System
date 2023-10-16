import React from 'react';

const ItemCard = ({ image, itemName, itemPrice }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={image} alt={itemName} className="w-full h-64 object-cover" loading="lazy"/>
            <div className="p-6">
                <div className="text-lg font-semibold">{itemName}</div>
                <div className="text-gray-600">${itemPrice}</div>
            </div>
        </div>
    );
};

export default ItemCard;

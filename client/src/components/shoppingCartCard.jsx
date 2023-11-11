import React from 'react';
import { useState } from 'react';

const ShoppingCartCard = ({ itemImage, itemName, itemPrice, itemCounter, ifChangeCounter}) => {
    const[counter, setCounter] = useState(itemCounter);
    const counterIncrement = () => {
        setCounter(counter + 1);
        ifChangeCounter(counter + 1);
    };

    const counterDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            ifChangeCounter(counter - 1);
        }
    };
    
    const buttonStyle = {
        borderRadius: '100%' ,
        backgroundColor: 'white' ,
    };
    return (
        <div className="flex flex-column bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img src={itemImage} alt={itemName} className="w-25% h-24 object-cover" loading="lazy"/>
            <div className="p-5">
                <div className="flex flex-column text-lg font-semibold">{itemName}</div>
                <div className="flex flex-column">
                    <div className="text-gray-600">${itemPrice}</div>
                    <div className="flex flex-column shadow-md text-right">
                        <button className="px-6" style={buttonStyle} onClick={counterDecrement}>-</button>
                        <div className="flex">{counter}</div>
                        <button className="px-6" style={buttonStyle} onClick={counterIncrement}>+</button>           
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShoppingCartCard;
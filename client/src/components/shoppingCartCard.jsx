import React from 'react';
import { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineMessage } from 'react-icons/ai'

const ShoppingCartCard = ({ itemImage, itemName, itemPrice, itemCounter }) => {
    const [counter, setCounter] = useState(itemCounter);
    const counterIncrement = () => {
        setCounter(counter + 1);
    };

    const counterDecrement = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };

    return (
        <div className="flex justify-between md:flex-row flex-col bg-gray-100 rounded-lg shadow-md px-2">
            {/* Item Content */}
            <div className='flex'>
                <img src={itemImage} alt={itemName} className="h-24 object-cover" loading="lazy" />
                <div className="p-5">
                    <div className="flex flex-column text-lg font-semibold">{itemName}</div>
                    <div className="flex flex-column">
                        <div className="text-gray-600">${itemPrice}</div>
                    </div>
                </div>
            </div>
            {/* Customizaton */}
            <div className='flex items-center md:mt-0 mt-4 justify-center'>
                {/* Item Notes */}
                <button className='mx-2'>
                    <AiOutlineMessage size={30} />
                </button>
                <div className="flex flex-col">
                    {/* Item Amount */}
                    <div className='flex rounded-lg bg-white'>
                        <button className="mx-4" onClick={counterDecrement}><AiOutlineMinusCircle /></button>
                        <div className="flex">{counter}</div>
                        <button className="mx-4" onClick={counterIncrement}><AiOutlinePlusCircle /></button>
                    </div>
                    {/* Item Remove */}
                    <div className='flex justify-center text-sm text-red-600'>
                        <button>Remove</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default ShoppingCartCard;
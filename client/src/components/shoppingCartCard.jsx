import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineMessage } from 'react-icons/ai'

const ShoppingCartCards = ({ itemImage, itemName, itemPrice, itemCounter, ifChangeCounter}) => {
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
            <div className='flex items-center md:mt-0 md:mb-0 mt-4 mb-4 justify-center'>
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

const ShoppingCartCard = ({item, cartSize, renderCartSize, calculateCosts, removeFromCart}) => {
    const [counter, setCounter] = useState(item[1]);

    const selfItem = item[0];
    //const itemCount = item[1];

    const itemImage = selfItem.image;
    const itemPrice = selfItem.itemPrice;
    const itemName = selfItem.itemName;

    const counterIncrement = () => {
        item[1]++;
        setCounter(counter + 1);
        renderCartSize(cartSize + 1);
        calculateCosts();
    };

    const counterDecrement = () => {
        if (counter > 1) {
            item[1] -= 1;
            setCounter(counter - 1);
            renderCartSize(cartSize - 1)
            //setCounter(counter - 1);
        }
        calculateCosts();
    };

    const removeItemFromCart = () => {
        removeFromCart(item);
    }

    

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
            <div className='flex items-center md:mt-0 md:mb-0 mt-4 mb-4 justify-center'>
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
                        <button onClick={removeItemFromCart}>Remove</button>
                    </div>

                </div>
            </div>
        </div>
    );
} 
export default ShoppingCartCard;
import React from 'react';
import ShoppingCartCard from './shoppingCartCard';

const ShoppingCart = ({ orderNum, tableNum, date, cartItems}) => {
    return (
        <div className="bg-white w-25% min-h-screen relative">
                <div className="text-xl text-center font-bold">Order #{orderNum}</div>
                <div className="text-sm text-center text-gray-600">Table #{tableNum}</div>
                <div className="text-sm text-center text-gray-600">{date}</div>
                <div className='grid grid-flow-row auto-row-max gap-y-2 mx-2 mt-3'>
                    {cartItems.map((cartItem) => (
                            <ShoppingCartCard
                                image={cartItem.image}
                                itemName={cartItem.itemName}
                                itemPrice={cartItem.itemPrice}
                                counter={cartItem.count}
                            />
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200 flex justify-center">
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Order Status</button>
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Help</button>
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Check Out</button>
                </div>
        </div>
    );
};

export default ShoppingCart;

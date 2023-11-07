import React from 'react';
import ShoppingCartCard from './shoppingCartCard';

const ShoppingCart = ({ orderNum, tableNum, date, cartItems, subTotal, tax, total }) => {
    return (
        <div className="bg-white h-screen flex flex-col justify-between">


            {/* Table and Shopping Cart Div */}
            <div className=''>
                {/* Table Information */}
                <div className='m-4'>
                    <div className="text-xl text-center font-bold">Order #{orderNum}</div>
                    <div className="text-sm text-center text-gray-600">Table #{tableNum}</div>
                    <div className="text-sm text-center text-gray-600">{date}</div>
                </div>

                {/* Shopping Cart Items */}
                <div className='grid grid-flow-row auto-row-max gap-y-4 m-4'>
                    {cartItems.map((cartItem) => (
                        <ShoppingCartCard
                            itemImage={cartItem.itemImage}
                            itemName={cartItem.itemName}
                            itemPrice={cartItem.itemPrice}
                            itemCounter={cartItem.itemCount}
                        />
                    ))}
                </div>
            </div>

            {/* Payment and Customer Buttons Div */}
            <div className=''>
                {/* Payment Amount */}
                <div class="flex flex-col p-4">
                    <div className='flex justify-between'>
                        <div>Subtotal: </div>
                        <div>{subTotal}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div class="">Tax: </div>
                        <div class="">{tax}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div class="font-bold text-lg">Total: </div>
                        <div class="font-bold text-lg">{total}</div>
                    </div>
                </div>

                {/* Customer buttons */}
                <div className="p-4 bg-gray-200 flex gap-4 justify-between">
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[33%]">Order Status</button>
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[33%]">Help</button>
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[33%]">Check Out</button>
                </div>
            </div>

        </div>
    );
};

export default ShoppingCart;

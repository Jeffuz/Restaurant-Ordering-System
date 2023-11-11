import React from 'react';
import { useState, useEffect } from 'react';
import ShoppingCartCard from './shoppingCartCard';

const ShoppingCart = ({ orderNum, tableNum, date, cartItems, setCartItems}) => {
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    useEffect(() => {
        const sum = cartItems.reduce((accu, cartItem) => {
            return accu + cartItem.itemPrice * cartItem.itemCount;
        }, 0);
        setSubTotal(sum.toFixed(2));
        const calcTax = 0.07 * sum;
        setTax(calcTax.toFixed(2));
        const calcTotal = sum + calcTax;
        setTotal(calcTotal.toFixed(2));
    }, [cartItems, total]);

    const changeCounter = (index, newCount) => {
        const updatedCart = [...cartItems];
        updatedCart[index].itemCount = newCount;
        setCartItems(updatedCart)
    };
    return (
        <div className="bg-white w-25% h-screen relative">
                <div className="text-xl text-center font-bold">Order #{orderNum}</div>
                <div className="text-sm text-center text-gray-600">Table #{tableNum}</div>
                <div className="text-sm text-center text-gray-600">{date}</div>
                <div className='grid grid-flow-row auto-row-max overflow-y-auto gap-y-2 mx-2 mt-3'>
                    {cartItems.map((cartItem, index) => (
                            <ShoppingCartCard
                                key={index}
                                itemImage={cartItem.itemImage}
                                itemName={cartItem.itemName}
                                itemPrice={cartItem.itemPrice}
                                itemCounter={cartItem.itemCount}
                                ifChangeCounter={(newCount) => changeCounter(index, newCount)}
                            />
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200 flex justify-center">
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Order Status</button>
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Help</button>
                    <button className="bg-white text-gray px-4 py-2 rounded-md mx-2">Check Out</button>
                    <div className="absolute bottom-28 left-0 h-16 w-16">SubTotal: </div>
                    <div className="absolute bottom-28 right-0 h-16 w-16">${subTotal}</div>
                    <div className="absolute bottom-24 left-0 h-16 w-16">Tax: </div>
                    <div className="absolute bottom-24 right-0 h-16 w-16">${tax}</div>
                    <div className="absolute bottom-16 left-0 h-16 w-16 font-bold text-lg">Total: </div>
                    <div className="absolute bottom-16 right-0 h-16 w-16 font-bold text-lg">${total}</div>
                </div>
        </div>
    );
};

export default ShoppingCart;

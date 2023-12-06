import React from 'react';
import { useState, useEffect } from 'react';
import ShoppingCartCard from './shoppingCartCard';
import OrderStatusModal from './orderStatusModal';

const ShoppingCart = ({ orderNum, tableNum, date, cartItems, cartSize, renderCartSize, removeFromCart, setCartItems, WebSocketService }) => {
    function sendOrder() {
        
        
        const actionObject = {
            'action': 'ORDER',
            'cart': cartItems,
        };

        WebSocketService.sendRequest(actionObject);
    }

    function checkOut() {
        
        cartItems.push(cartItems[0]);
        
    }

    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

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

    const calculateCosts = () => {
        let sum = 0;
        cartItems.forEach((cartItem) => {
            sum += cartItem[0].itemPrice;
        });
        setSubTotal(sum.toFixed(2));
        const calcTax = 0.07 * sum;
        setTax(calcTax.toFixed(2));
        const calcTotal = sum + calcTax;
        setTotal(calcTotal.toFixed(2));
    }

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
                    {cartItems.map((cartItem, index) => (
                        <ShoppingCartCard item={cartItem} calculateCosts={calculateCosts} cartSize={cartSize} renderCartSize={renderCartSize} removeFromCart={removeFromCart}/>
                    ))}
                </div>
            </div>

            {/* Payment and Customer Buttons Div */}
            <div className=''>
                {/* Payment Amount */}
                <div className="flex flex-col p-4">
                    <div className='flex justify-between'>
                        <div>Subtotal: </div>
                        <div>${subTotal}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="">Tax: </div>
                        <div className="">${tax}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="font-bold text-lg">Total: </div>
                        <div className="font-bold text-lg">${total}</div>
                    </div>
                </div>

                {/* Customer buttons */}
                <div className="p-4 bg-gray-200 flex gap-4 justify-between ">
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[25%] hover:bg-gray-50 transition ease-in-out" onClick={() => openModal()}>Order Status</button>
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[25%] hover:bg-gray-50 transition ease-in-out">Help</button>
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[25%] hover:bg-gray-50 transition ease-in-out" onClick={sendOrder}>Order</button>
                    <button className="bg-white text-gray px-6 py-6 rounded-md w-[25%] hover:bg-gray-50 transition ease-in-out" onClick={checkOut}>Check Out</button>
                </div>
            </div>

            <OrderStatusModal isOpen={selectedItem !== null} onClose={closeModal} item={selectedItem} />

        </div>
    );
};

export default ShoppingCart;

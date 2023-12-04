import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ShoppingCartCard from '../shoppingCartCard';
import { FaShoppingCart } from "react-icons/fa";
import ReactCardFlip from 'react-card-flip'
import { BsFillSendFill } from "react-icons/bs";

const LpShoppingCart = ({ isOpen, onClose, cartItems }) => {


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

    const [isFlipped, setIsFlipped] = useState(false);
    function flipCard() {
        setIsFlipped(!isFlipped);
    }

    if (!isOpen) return null;

    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center z-20'>
                <ReactCardFlip
                    flipDirection='horizontal'
                    isFlipped={isFlipped}
                    containerClassName="card"
                >
                    {/* Shopping Cart Side */}

                    <div className="bg-white p-3 rounded-[25px] shadow-lg flex flex-col w-[75vw] h-[75vh]">
                        <button className='flex justify-end p-5 fixed'>
                            <AiOutlineClose onClick={onClose} size={20} />
                        </button>
                        <div className='flex justify-center text-3xl p-3'>Shopping Cart</div>
                        <div className='h-screen overflow-y-auto'>
                            <div className='grid xl:grid-cols-2 grid-cols-1 gap-8 p-8'>
                                {cartItems.map((cartItem) => (
                                    <ShoppingCartCard
                                        key={cartItem.id}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemPrice={cartItem.itemPrice}
                                        itemCounter={cartItem.itemCount}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-end'>
                            <button className='font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5'>
                                <div onClick={flipCard} className='flex items-center gap-1'>
                                    <FaShoppingCart size={20} />
                                    Check Out
                                </div>
                            </button>
                        </div>
                    </div>


                    {/* Checkout Side */}
                    <div className="">
                        <div className="bg-white p-3 rounded-[25px] shadow-lg flex flex-col w-[75vw] h-[75vh]">
                            <button className='flex justify-end p-5 fixed'>
                                <AiOutlineClose onClick={onClose} size={20} />
                            </button>
                            <div className='flex justify-center text-3xl p-3'>Check Out</div>


                            <div className='h-screen overflow-y-auto'>
                                <div className='grid xl:grid-cols-2 grid-cols-1 gap-8 p-8'>
                                    {cartItems.map((cartItem) => (
                                        <ShoppingCartCard
                                            key={cartItem.id}
                                            itemImage={cartItem.itemImage}
                                            itemName={cartItem.itemName}
                                            itemPrice={cartItem.itemPrice}
                                            itemCounter={cartItem.itemCount}
                                        />
                                    ))}
                                </div>

                            </div>
                            <div className='flex flex-col items-center justify-end'>
                                {/* Payment Amount */}
                                <div class="flex flex-col p-4">
                                    <div className='flex justify-between gap-5'>
                                        <div>Subtotal: </div>
                                        <div>${subTotal}</div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div class="">Tax: </div>
                                        <div class="">${tax}</div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div class="font-bold text-lg">Total: </div>
                                        <div class="font-bold text-lg">${total}</div>
                                    </div>
                                </div>
                                <button className='font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5'>
                                    <div className='flex items-center gap-1'> {/* Change the onClick for submitting order */}
                                        <BsFillSendFill size={20} />
                                        Submit Order
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </ReactCardFlip>
            </div>
            {/* <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}> */}
            {/* Shopping Cart Side */}
            {/* <div className="fixed inset-0 flex items-center justify-center card">
                    <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
                        <button className='flex justify-end p-5 fixed'>
                            <AiOutlineClose onClick={onClose} size={20} />
                        </button>
                        <div className='flex justify-center text-3xl p-3'>Shopping Cart</div>
                        <div className='h-screen overflow-y-auto'>
                            <div className='grid grid-cols-3 gap-8 p-8'>
                                {cartItems.map((cartItem) => (
                                    <ShoppingCartCard
                                        key={cartItem.id}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemPrice={cartItem.itemPrice}
                                        itemCounter={cartItem.itemCount}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-end'>
                            <button className='font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5'>
                                <div onClick={flipCard} className='flex items-center gap-1'>
                                    <FaShoppingCart size={20} />
                                    Check Out
                                </div>
                            </button>
                        </div>
                    </div>
                </div> */}
            {/* Checkout Side */}
            {/* <div className="fixed inset-0 flex items-center justify-center card cardback">
                    <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
                        <button className='flex justify-end p-5 fixed'>
                            <AiOutlineClose onClick={onClose} size={20} />
                        </button>
                        <div className='flex justify-center text-3xl p-3'>Check Out</div>
                        <div className='h-screen overflow-y-auto'>
                            <div className='grid grid-cols-3 gap-8 p-8'>
                                {cartItems.map((cartItem) => (
                                    <ShoppingCartCard
                                        key={cartItem.id}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemPrice={cartItem.itemPrice}
                                        itemCounter={cartItem.itemCount}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-end'>
                            <button className='font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5'>
                                <div onClick={flipCard} className='flex items-center gap-1'>
                                    <FaShoppingCart size={20} />
                                    Check Out
                                </div>

                            </button>
                        </div>
                    </div>
                </div> */}
            {/* </ReactCardFlip> */}

        </>
    )
}

export default LpShoppingCart
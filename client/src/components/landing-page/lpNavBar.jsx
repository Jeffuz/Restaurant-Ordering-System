import React, { useState } from 'react';
import Login from '../login';
import Signup from '../signup';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import LpShoppingCart from './lpShoppingCart';

const LpNavBar = ({cartItems, cartSize, renderCartSize, removeFromCart, WebSocketService}) => {
    /* Testing */
    let email = true;
    // let email = false;
    let admin = true;
    // let admin = false;

    // Sign In/Up
    const [selectedLoginItem, setSelectedLoginItem] = useState(null);
    const [selectedSignupItem, setSelectedSignupItem] = useState(null);

    const openLoginModal = () => {
        setSelectedLoginItem();
    };

    const closeLoginModal = () => {
        setSelectedLoginItem(null);
    };

    const openSignupModal = () => {
        setSelectedSignupItem();
    };

    const closeSignupModal = () => {
        setSelectedSignupItem(null);
    };

    // Shopping Cart
    const itemCount = cartSize; // Item Count Here
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const openCartModal = () => {
        setSelectedCartItem();
    };

    const closeCartModal = () => {
        setSelectedCartItem(null);
    };

    return (
        <>
            <div className='font-tt-norms-pro px-12 relative z-20'>
                <div className='md:flex absolute items-center font-bold text-4xl text-light-secondary hidden top-4 left-8 '>
                    <Link to={"/"}>115A's Diner</Link>
                </div>
                {email ? (
                    <div className='absolute top-4 right-8 '>
                        <div className='flex font-bold items-center gap-3 '>
                            {admin && (
                                <Link to="/admin-dashboard">
                                    <MdOutlineDashboard size={30} />
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='absolute top-4 right-8'>
                        <div className='flex gap-x-2 font-bold'>
                            <button className='px-3 text-black rounded-3xl leading-10' onClick={() => openLoginModal()}>
                                Sign In
                            </button>
                            <button className='px-3 bg-light-secondary rounded-3xl leading-10 text-white' onClick={() => openSignupModal()}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Login isOpen={selectedLoginItem !== null} onClose={closeLoginModal} />
            <Signup isOpen={selectedSignupItem !== null} onClose={closeSignupModal} />
            <LpShoppingCart isOpen={selectedCartItem !== null} onClose={closeCartModal} cartItems={cartItems} cartSize={cartSize} renderCartSize={renderCartSize} removeFromCart={removeFromCart} WebSocketService={WebSocketService}/>
        </>
    )
}

export default LpNavBar
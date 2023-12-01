import React, { useState } from 'react';
import Login from '../login';
import Signup from '../signup';
import { IoCartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import LpShoppingCart from './lpShoppingCart';

const LpNavBar = () => {

    /* Testing */
    let email = true;
    // let email = false;
    let admin = true;
    // let admin = false;

    const cartItems = [
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 1
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        },

    ];

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
    const itemCount = 3;
    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const openCartModal = () => {
        setSelectedCartItem();
    };

    const closeCartModal = () => {
        setSelectedCartItem(null);
    };

    return (
        <>
            <div className='flex justify-between pt-4 font-tt-norms-pro w-[100%] px-12'>
                <div className='md:flex items-center font-bold text-4xl text-light-secondary hidden '>
                    <Link to={"/"}>115A's Diner</Link>
                </div>
                {email ? (
                    <div className='absolute top-4 right-12'>
                        <div className='flex font-bold items-center gap-3'>
                            {admin && (
                                <Link to="/admin-dashboard">
                                    <MdOutlineDashboard size={30} />
                                </Link>
                            )}
                            <div className='flex gap-3 items-center'>
                                <button className='flex items-center text-black rounded-3xl leading-10 px-3' onClick={() => openCartModal()}>
                                    <IoCartOutline size={30} />
                                    {itemCount > 0 && <span className='ml-1'>{itemCount}</span>}
                                </button>
                                <Link to="" >
                                    <img src="profile.png" alt='Profile' className='w-10 h-10 rounded-full' />
                                </Link>
                                <button
                                    className='px-3 text-black rounded-3xl leading-10'
                                // onClick = {}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='absolute top-4 right-12'>
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
            <LpShoppingCart isOpen={selectedCartItem !== null} onClose={closeCartModal} cartItems={cartItems} />
        </>
    )
}

export default LpNavBar
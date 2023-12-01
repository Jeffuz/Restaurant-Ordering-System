import React, { useState } from 'react'
import Login from '../login';
import Signup from '../signup';

const LpNavBar = () => {
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

    return (
        <>
            <div className='flex justify-between pt-4 font-tt-norms-pro w-[100%] px-12'>
                <div className='flex items-center font-bold text-4xl md:text-light-secondary text-light-tertiary'>
                    115A's Diner
                </div>
                <div className='flex gap-x-2 font-bold'>
                    <button className='px-3  text-black rounded-3xl leading-10' onClick={() => openLoginModal()}>Sign In</button>
                    <button className='px-3 bg-light-secondary rounded-3xl leading-10 text-white'onClick={() => openSignupModal()}>Sign Up</button>
                </div>
            </div>
            <Login isOpen={selectedLoginItem !== null} onClose={closeLoginModal} />
            <Signup isOpen={selectedSignupItem !== null} onClose={closeSignupModal} />
        </>
    )
}

export default LpNavBar
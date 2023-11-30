import React, { useState, useEffect } from 'react';
import LpNavBar from '../components/landing-page/lpNavBar'
import LpPopularItemCards from '../components/landing-page/lpPopularItemCards'
import { IoFastFood } from "react-icons/io5";
import LpFooter from '../components/landing-page/lpFooter';

const items = [
    {
        id: "nacho-chips",
        image: "test/nacho-chips.png",
        itemName: "Nacho Chips",
        itemPrice: 9.99,
    },
    {
        id: "steak1",
        image: "test/steak.png",
        itemName: "Steak",
        itemPrice: 19.99,
    },
    {
        id: "nacho-chips",
        image: "test/nacho-chips.png",
        itemName: "Nacho Chips",
        itemPrice: 9.99,
    },
    {
        id: "steak1",
        image: "test/steak.png",
        itemName: "Steak",
        itemPrice: 19.99,
    },
    {
        id: "nacho-chips",
        image: "test/nacho-chips.png",
        itemName: "Nacho Chips",
        itemPrice: 9.99,
    },
    {
        id: "steak1",
        image: "test/steak.png",
        itemName: "Steak",
        itemPrice: 19.99,
    },
    {
        id: "nacho-chips",
        image: "test/nacho-chips.png",
        itemName: "Nacho Chips",
        itemPrice: 9.99,
    },
    {
        id: "steak1",
        image: "test/steak.png",
        itemName: "Steak",
        itemPrice: 19.99,
    },

];

function getItemsToShow() {
    const width = window.innerWidth;

    if (width >= 1536) {
        return 8;
    } else if (width >= 1024) {
        return 6;
    } else if (width >= 640) {
        return 4;
    } else {
        return 2;
    }
}

const Landing_page = () => {
    const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

    useEffect(() => {
        const handleResize = () => {
            setItemsToShow(getItemsToShow());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='font-tt-norms-pro'>
            <div className='bg-light-tertiary h-[85vh]'>
                <LpNavBar />
                <div className='flex flex-col justify-center items-center h-[90%] '>
                    <span className='md:text-6xl text-5xl'>Welcome to</span>
                    <span className='md:text-8xl text-7xl'>115A's Diner</span>
                    <button className='bg-light-secondary text-white rounded-3xl py-2 px-4 mt-7 font-bold text-2xl flex items-center'>
                        <div>Order Now&nbsp;</div>
                        <IoFastFood />
                    </button>
                </div>
            </div>
            <div className=' h-screen flex flex-col item-center bg-light-secondary'>
                <div className='mx-auto'>
                    <div className='font-bold text-4xl py-6 text-light-primary'>Popular Items</div>
                    <div className={`grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8`}>
                        {items.slice(0, itemsToShow).map((item) => (
                            <div key={item.id} role="button">
                                <LpPopularItemCards
                                    image={item.image}
                                    itemName={item.itemName}
                                    itemPrice={item.itemPrice}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-light-tertiary h-[80vh] flex justify-center items-center'>
                <div className='flex'>
                    
                </div>
            </div>
            <LpFooter/>
        </div>
    )
}

export default Landing_page
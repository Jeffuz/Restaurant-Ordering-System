import React, { useState, useEffect } from 'react';
import LpNavBar from '../components/landing-page/lpNavBar'
import LpPopularItemCards from '../components/landing-page/lpPopularItemCards'
import { IoFastFood } from "react-icons/io5";
import LpFooter from '../components/landing-page/lpFooter';
import LpTestimonial from '../components/landing-page/lpTestimonial';
import { Link } from 'react-router-dom';

const items = [
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

    const backgroundImagePath = 'WelcomePanel.png';

    return (
        <>
            <div className='font-tt-norms-pro'>
                <div className='relative'>
                    <LpNavBar cartItems={items}/>
                    <div className='flex flex-col justify-center items-center h-[85vh] z-10 relative'>
                        <span className='md:text-6xl text-5xl'>Welcome to</span>
                        <span className='md:text-8xl text-7xl'>115A's Diner</span>
                        <Link to="/menu">
                            <button className='bg-light-secondary text-white rounded-3xl py-2 px-4 mt-7 font-bold text-2xl flex items-center'>
                                <div>Order Now&nbsp;</div>
                                <IoFastFood />
                            </button>
                        </Link>
                    </div>
                    <div className='bg-light-tertiary h-[85vh] absolute inset-0' style={{ backgroundImage: `url(${backgroundImagePath})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}></div>
                </div>
                <div className=' h-screen flex flex-col item-center bg-light-secondary'>
                    <div className='mx-auto'>
                        <div className='font-bold text-4xl py-6 text-white'>Popular Items</div>
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
                <div className='bg-light-tertiary h-[70vh] flex justify-center items-center'>
                    <div className='container mx-auto'>
                        <div className='flex flex-col items-center'>
                            <div className='text-5xl font-bold text-light-primary mb-6'>About Us</div>
                            <div className='text-2xl text-light-primary max-w-4xl text-center px-5'>
                                Welcome to 115A's Diner, where passion meets flavor! Our journey began with a simple
                                idea: to create a dining experience that combines the warmth of home-cooked meals with
                                the excitement of culinary innovation. At 115A's Diner, we source the finest ingredients
                                to craft delicious dishes that cater to every palate. Whether you're a fan of classic
                                comfort food or crave bold and adventurous flavors, our menu has something special for you.
                                Join us on this gastronomic journey and savor the moments at 115A's Diner. We look
                                forward to serving you with a smile and creating memories that last a lifetime.
                            </div>
                        </div>
                    </div>
                </div>
                <LpTestimonial />
                <LpFooter />
            </div>
        </>
    )
}

export default Landing_page
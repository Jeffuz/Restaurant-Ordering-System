import React from 'react'
import ItemCard from '../components/itemCard'
import Filterbar from '../components/filterbar';

const Menu = () => {
    const items = [
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemPrice: 19.99,
        },
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemPrice: 19.99,
        },
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemPrice: 19.99,
        },
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemPrice: 19.99,
        },
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemPrice: 19.99,
        },
    ];

    return (

        <>
            <div className='flex'>
                <div className='flex flex-col w-[75%] gap-8'>
                    <Filterbar />
                    <div className='grid grid-cols-5 gap-x-12 gap-y-9'>
                        {items.map((item) => (
                            <ItemCard
                                id={item.id}
                                image={item.image}
                                itemName={item.itemName}
                                itemPrice={item.itemPrice}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>

    )
}

export default Menu
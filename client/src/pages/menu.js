import React from 'react'
import ItemCard from '../components/itemCard'

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
        <div>
            <div className='grid grid-cols-5 gap-x-12 gap-y-9 mx-16 my-8 w-[75%]'>
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
    )
}

export default Menu
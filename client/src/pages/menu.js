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
    ];

    return (
        <div>
            {items.map((item) => (
                <ItemCard
                    id={item.id}
                    image={item.image}
                    itemName={item.itemName}
                    itemPrice={item.itemPrice}
                />
            ))}
        </div>
    )
}

export default Menu
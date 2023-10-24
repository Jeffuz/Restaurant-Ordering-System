import React, { useState } from 'react'
import ItemCard from '../components/itemCard'
import Filterbar from '../components/filterbar';
import ItemModal from '../components/itemModal';

const Menu = () => {
    const items = [
        {
            id: 'nacho-chips',
            image: 'test/nacho-chips.png',
            itemName: 'Nacho Chips',
            itemPrice: 9.99,
            itemContent: 'Our Nacho Chips are pure crunch-time happiness. Made from premium corn, these crispy tortilla chips are generously smothered in a secret blend of melted cheeses, and topped with fresh jalapeños for a hint of spice. Served with our house-made salsa and creamy guacamole, they\'re the perfect shareable snack for your next fiesta',
            itemDiet: ['Spicy', 'Vegan']
        },
        {
            id: 'steak',
            image: 'test/steak.png',
            itemName: 'Steak',
            itemContent: 'Our Nacho Chips are pure crunch-time happiness. Made from premium corn, these crispy tortilla chips are generously smothered in a secret blend of melted cheeses, and topped with fresh jalapeños for a hint of spice. Served with our house-made salsa and creamy guacamole, they\'re the perfect shareable snack for your next fiesta',
            itemPrice: 19.99,
            itemDiet: ['Spicy', 'Vegan']
        }
    ];

    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };


    return (

        <>
            <div className='flex'>
                <div className='flex flex-col w-[75%] gap-8'>
                    <Filterbar />
                    <div className='grid grid-cols-5 gap-x-12 gap-y-9'>
                        {items.map((item) => (
                            <div onClick={() => openModal(item)} role='button'>
                                <ItemCard
                                    image={item.image}
                                    itemName={item.itemName}
                                    itemPrice={item.itemPrice}
                                    itemContent={item.itemContent}
                                    itemDiet={item.itemDiet}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <ItemModal isOpen={selectedItem !== null} onClose={closeModal} item={selectedItem} />
        </>

    )
}


export default Menu
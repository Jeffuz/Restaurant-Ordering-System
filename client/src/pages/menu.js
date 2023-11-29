import React, { useState, useEffect } from 'react'
import ItemCard from '../components/itemCard'
import Filterbar from '../components/filterbar';
import ItemModal from '../components/itemModal';
import ShoppingCart from '../components/shoppingCart';

import WebSocketService from '../WebSocketService';

const Menu = () => {

    const [items, setItems] = useState([]); // used to save data states
    const [isLoading, setIsLoading] = useState(true); // used to save whether data is loading 

    const [menuItems, setMenuItems] = useState([]);
    
    const menuSet = false;

    useEffect(() => {
        if (!WebSocketService.socket){
            WebSocketService.connect('127.0.0.1', '8080')
            .then(
                alert("Connected!"),
            );
        }
        // Loads the menu items from the menu stored in WebSocketService.menu
        /*if (!menuSet && WebSocketService.socket){
            setMenuItems(WebSocketService.menu.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            }))); 
        }*/
        

        const menuUpdateHandler = () => {
            console.log("Menu.js update received!");
            const menuList = WebSocketService.menu;
            console.log("Menu:", menuList);
            if(menuList){
                setMenuItems(menuList.map(item => ({
                    id: item.menuId,
                    image: item.image,
                    itemFilter: item.filter,
                    itemName: item.name,
                    itemContent: item.description,
                    itemPrice: item.price,
                    itemDiet: item.diet,
                })));
            }
        }

        setIsLoading(false);

        window.addEventListener('menuUpdate', menuUpdateHandler);
    }, []);


    const [cartItems, setCartItems] = useState([
        {
            index: 0,
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 1
        },
        {
            index: 1,
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemPrice: 9.99,
            itemCount: 2
        }
    ]);

    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    // render the pages if the data is loaded
    if (isLoading) {
        return <div>Loading...</div>; // if data is loading, rending a loading pages
    }
    else {

        return (
            <>
                <div className="flex flex-row h-screen">
                    <div className="w-[75%]">
                        <div className='flex flex-col h-screen p-8'>
                            <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold px-6 mb-6'>Menu</div>
                            <div className='scrollbar-hide'><Filterbar /></div>
                            <div className='mt-8 overflow-y-auto'>
                                <div className="grid grid-cols-5 gap-8">
                                    {items.map((item) => (
                                        <div onClick={() => openModal(item)} role="button">
                                            <ItemCard
                                                image={item.image}
                                                itemName={item.itemName}
                                                itemFilter={item.itemFilter}
                                                itemPrice={item.itemPrice}
                                                itemContent={item.itemContent}
                                                itemDiet={item.itemDiet}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col w-[25%] gap-8'>
                        <ShoppingCart orderNum="222" tableNum="1" date="October 26, 2023" cartItems={cartItems} setCartItems={setCartItems} WebSocketService={WebSocketService} />
                    </div>
                </div>

                <ItemModal isOpen={selectedItem !== null} onClose={closeModal} item={selectedItem} />
            </>
        );
    }
};

export default Menu;

import React, { useState, useEffect } from 'react'
import ItemCard from '../components/itemCard'
import Filterbar from '../components/filterbar';
import ItemModal from '../components/itemModal';
import ShoppingCart from '../components/shoppingCart';
import LpNavBar from '../components/landing-page/lpNavBar';
import WebSocketService from '../WebSocketService';

const Menu = () => {
    let admin = false;

    const [items, setItems] = useState([]); // used to save data states
    const [isLoading, setIsLoading] = useState(true); // used to save whether data is loading 

    useEffect(() => {
        // Function invoked when WebSocketService receives a menu update
        const menuUpdateHandler = () => {
            console.log("Menu.js update received!");
            const menuList = WebSocketService.menu;
            console.log('menuList:', menuList);
            if (menuList) {
                setItems(menuList.map(item => ({
                    id: item.menuId,
                    image: item.image,
                    itemFilter: item.filter,
                    itemName: item.name,
                    itemContent: item.description,
                    itemPrice: item.price,
                    itemDiet: item.diet,
                    itemCustomization: item.customize,
                })));
                setIsLoading(false);
            }
        }

        // Connect to server if not already connected
        if (!WebSocketService.socket) {
            WebSocketService.connect('127.0.0.1', '8080', false)
                .then(
                    alert("Connected!"),
                );
        }

        window.addEventListener('menuUpdate', menuUpdateHandler);
    }, []);

    const [cartItems, renderCartItems] = useState([]);
    const [cartSize, renderCartSize] = useState(0);

    const [selectedItem, setSelectedItem] = useState(null);

    const getRandomNumber = () => Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000);
    
    const addItemToCart = (item) => {
        const hash = getRandomNumber();
        const updatedCart = [...cartItems, [item, hash]];
        renderCartItems(updatedCart); 
        renderCartSize(cartSize + 1);
    }

    

    const removeItemFromCart = (hash) => {
        if (hash === 0){
            closeModal();
            renderCartSize(0);
            renderCartItems([]);
        }else{
            renderCartSize(cartSize - 1);
            const newCartItems = cartItems.filter((cartItem) => cartItem[1] !== hash);
            renderCartItems(newCartItems);
        }
    }

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    // callback listener for itemcard 
    const handleItemClick = (clickedItem) => {
        addItemToCart(clickedItem);
    }

    // render the pages if the data is loaded
    if (isLoading) {
        return <div>Loading...</div>; // if data is loading, rending a loading pages
    }

    else {

        return (
            <div className='font-tt-norms-pro'>
                {admin ? (
                    <>
                        <div className="flex h-screen">

                            <div className='flex flex-col h-screen p-8'>
                                <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold px-6 mb-6 '>Menu</div>
                                <div className='scrollbar-hide '><Filterbar /></div>
                                <div className='mt-8 overflow-y-auto '>
                                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                                        {items.map((item) => (
                                            <div onClick={() => openModal(item)} role="button">
                                                <ItemCard
                                                    image={item.image}
                                                    itemName={item.itemName}
                                                    itemFilter={item.itemFilter}
                                                    itemPrice={item.itemPrice}
                                                    itemContent={item.itemContent}
                                                    itemDiet={item.itemDiet}
                                                    itemCustomization = {item.itemCustomization}
                                                    onItemClick={openModal}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-[25vw] gap-8'>
                                <ShoppingCart orderNum="222" tableNum="1" date="October 26, 2023" cartItems={cartItems} setCartItems={renderCartItems} WebSocketService={WebSocketService} />
                            </div>
                            <ItemModal isOpen={selectedItem !== null} onClose={closeModal} item={selectedItem} />
                        </div>
                    </>
                ) : (

                    <div className="h-screen">
                        <LpNavBar cartItems={cartItems} cartSize={cartSize} renderCartSize={renderCartSize} removeFromCart={removeItemFromCart} WebSocketService={WebSocketService} />
                        <div className='flex flex-col h-screen p-8'>
                            <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold px-6 mb-6 '>Menu</div>
                            <div className='scrollbar-hide '><Filterbar /></div>
                            <div className='mt-8 overflow-y-auto '>
                                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

                            {items.map((item) => (
                                            <div onClick={() => openModal(item)} role="button">
                                                <ItemCard
                                                    image={item.image}
                                                    itemName={item.itemName}
                                                    itemFilter={item.itemFilter}
                                                    itemPrice={item.itemPrice}
                                                    itemContent={item.itemContent}
                                                    itemDiet={item.itemDiet}
                                                    itemCustomization = {item.itemCustomization}
                                                />
                                            </div>
                                        ))}
                               

                        </div>
                        <ItemModal isOpen={selectedItem !== null} onClose={closeModal} parentCallback={handleItemClick} item={selectedItem} />
                    </div>
                )}
            </div>
        );
    }
};

export default Menu;
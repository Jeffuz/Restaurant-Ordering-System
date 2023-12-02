import React, { useState, useEffect } from 'react'
import ItemCard from '../components/itemCard'
import Filterbar from '../components/filterbar';
import ItemModal from '../components/itemModal';
import ShoppingCart from '../components/shoppingCart';
import LpNavBar from '../components/landing-page/lpNavBar';

// louis handle getting menu from database
// try to connect
let menuList = null;

const Menu = (props) => {


    // Testing
    let admin = true;
    // let admin = false;


    // Jeff:
    // let items = [
    //     {
    //         id: "nacho-chips",
    //         image: "test/nacho-chips.png",
    //         itemFilter: ["Lunch", "Supper"],
    //         itemName: "Nacho Chips",
    //         itemPrice: 9.99,
    //         itemContent: "Our Nacho Chips are pure crunch-time happiness.",
    //         itemDiet: ["Spicy", "Vegan"],
    //     },
    //     {
    //         id: "steak",
    //         image: "test/steak.png",
    //         itemFilter: ["Lunch", "Supper"],
    //         itemName: "Steak",
    //         itemContent: "Our Nacho Chips are pure crunch-time happiness.",
    //         itemPrice: 19.99,
    //         itemDiet: ["Spicy", "Vegan"],
    //     },
    // ];

    const [items, setItems] = useState([]); // used to save data states
    const [isLoading, setIsLoading] = useState(true); // used to save whether data is loading 

    const { WebSocketService } = props;
    /*useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            // create a getMenus request when connecting to the server.
            const actionObject = {
                "action": "getMenus",
                "restaurantId": "65381ed4030fa645be95b250"
            };

            // send request
            socket.send(JSON.stringify(actionObject));
        });

        // listen to the server response
        socket.addEventListener('message', function (event) {
            // parse the data
            const menuList = JSON.parse(event.data).menuList;

            //set data into state and set loading state as false
            setItems(menuList.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            })));
            setIsLoading(false);
        });

        // when component finished，close WebSocket connection
        return () => {
            socket.close();
        };
    }, []);*/

    function getMenu() {
        const actionObject = {
            'action': 'getMenus',
            'restaurantId': '65381ed4030fa645be95b250'
        };

        WebSocketService.sendRequest(actionObject);
    }

    useEffect(() => {
        getMenu();

        const menuUpdateHandler = (event) => {
            const menuList = event.detail.data;
            setItems(menuList.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            })));
            setIsLoading(false);
        }

        window.addEventListener('menuUpdate', menuUpdateHandler);

        return () => {
            window.removeEventListener('menuUpdate', menuUpdateHandler);
        };
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
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-[25vw] gap-8'>
                                <ShoppingCart orderNum="222" tableNum="1" date="October 26, 2023" cartItems={cartItems} setCartItems={setCartItems} WebSocketService={WebSocketService} />                            </div>
                            <ItemModal isOpen={selectedItem !== null} onClose={closeModal} item={selectedItem} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-screen">

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
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <LpNavBar />
                        </div>
                    </>
                )}



            </div>
        );
    }
};

export default Menu;
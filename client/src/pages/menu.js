import React, { useState, useEffect } from "react";
import ItemCard from "../components/itemCard";
import Filterbar from "../components/filterbar";
import ItemModal from "../components/itemModal";
import ShoppingCart from "../components/shoppingCart";
import LpNavBar from "../components/landing-page/lpNavBar";
import WebSocketService from "../WebSocketService";
import { onAuthStateChanged } from "firebase/auth";
import { auth, readUserData } from "../firebase";
import { useCartState } from "./cartState";

const Menu = () => {
    const [admin, setAdmin] = useState(false);
    const [items, setItems] = useState([]); // used to save data states
    const [isLoading, setIsLoading] = useState(true); // used to save whether data is loading

    useEffect(() => {
        // Function invoked when WebSocketService receives a menu update
        const menuUpdateHandler = () => {
            const menuList = WebSocketService.menu;

            if (menuList) {
                setItems(
                    menuList.map((item) => ({
                        id: item.menuId,
                        image: item.image,
                        itemFilter: item.filter,
                        itemName: item.name,
                        itemContent: item.description,
                        itemPrice: item.price,
                        itemDiet: item.diet,
                    }))
                );
                setIsLoading(false);
            }
        };

        const authStateChangeHandler = (authUser) => {
            setAdmin(authUser);

            if (authUser) {
                readUserData(authUser.uid).then((userData) => {
                    if (userData && userData.restaurantId !== 0) {
                        setAdmin(true);
                    } else {
                        setAdmin(false);
                    }
                });
            } else {
                setAdmin(false);
            }
        };

        const unsubscribeAuthStateChange = onAuthStateChanged(
            auth,
            authStateChangeHandler
        );

        // Connect to server if not already connected
        if (!WebSocketService.socket) {
            WebSocketService.connect("127.0.0.1", "8080", false).then();
        }

        window.addEventListener("menuUpdate", menuUpdateHandler);

        return () => {
            unsubscribeAuthStateChange(); // Cleanup the auth state change listener
            window.removeEventListener("menuUpdate", menuUpdateHandler);
        };
    }, []);

    const {
        cartItems,
        cartSize,
        selectedItem,
        renderCartItems,
        renderCartSize,
        openModal,
        closeModal,
        removeItemFromCart,
        handleItemClick,
    } = useCartState();

    // render the pages if the data is loaded
    if (isLoading) {
        return <div>Loading...</div>; // if data is loading, rending a loading pages
    } else {
        return (
            <div className="font-tt-norms-pro">
                {admin ? (
                    <>
                        <div className="flex h-screen">
                            <div className="flex flex-col h-screen p-8">
                                <div className="text-center mt-27 text-black font-Montserrat text-4xl font-bold px-6 mb-6 ">
                                    Menu
                                </div>
                                <div className="scrollbar-hide ">
                                    <Filterbar />
                                </div>
                                <div className="mt-8 overflow-y-auto ">
                                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                                        {items.map((item) => (
                                            <div
                                                onClick={() => openModal(item)}
                                                role="button"
                                            >
                                                <ItemCard
                                                    item={item}
                                                    onItemClick={openModal}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-[25vw] gap-8">
                                <ShoppingCart
                                    orderNum="222"
                                    tableNum="1"
                                    date="October 26, 2023"
                                    cartItems={cartItems}
                                    setCartItems={renderCartItems}
                                    WebSocketService={WebSocketService}
                                />
                            </div>
                            <ItemModal
                                isOpen={selectedItem !== null}
                                onClose={closeModal}
                                item={selectedItem}
                            />
                        </div>
                    </>
                ) : (
                    <div className="h-screen">
                        <LpNavBar
                            cartItems={cartItems}
                            cartSize={cartSize}
                            renderCartSize={renderCartSize}
                            removeFromCart={removeItemFromCart}
                            WebSocketService={WebSocketService}
                        />
                        <div className="flex flex-col h-screen p-8">
                            <div className="text-center mt-27 text-black font-Montserrat text-4xl font-bold px-6 mb-6 ">
                                Menu
                            </div>
                            <div className="scrollbar-hide ">
                                <Filterbar />
                            </div>
                            <div className="mt-8 overflow-y-auto ">
                                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                                    {items.map((item) => (
                                        <div key={item.id}>
                                            <ItemCard
                                                item={item}
                                                onItemClick={openModal}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ItemModal
                            isOpen={selectedItem !== null}
                            onClose={closeModal}
                            parentCallback={handleItemClick}
                            item={selectedItem}
                        />
                    </div>
                )}
            </div>
        );
    }
};

export default Menu;
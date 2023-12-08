import { useState } from "react";

export const useCartState = () => {
    const [cartItems, renderCartItems] = useState([]);
    const [cartSize, renderCartSize] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const getRandomNumber = () =>
        Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000);

    const addItemToCart = (item) => {
        const hash = getRandomNumber();
        const updatedCart = [...cartItems, [item, hash]];
        renderCartItems(updatedCart);
        renderCartSize(cartSize + 1);
    };

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const removeItemFromCart = (hash) => {
        if (hash === 0) {
            closeModal();
            renderCartSize(0);
            renderCartItems([]);
        } else {
            renderCartSize(cartSize - 1);
            const newCartItems = cartItems.filter(
                (cartItem) => cartItem[1] !== hash
            );
            renderCartItems(newCartItems);
        }
    };
    // callback listener for itemcard
    const handleItemClick = (clickedItem) => {
        addItemToCart(clickedItem);
    };

    return {
        cartItems,
        cartSize,
        selectedItem,
        renderCartItems,
        renderCartSize,
        setSelectedItem,
        addItemToCart,
        openModal,
        closeModal,
        removeItemFromCart,
        handleItemClick,
    };
};

import React, { useState, useEffect } from "react";
import ItemCard from "../components/itemCard";
import Filterbar from "../components/filterbar";
import ItemModal from "../components/itemModal";
import LpNavBar from "../components/landing-page/lpNavBar";
import WebSocketService from "../WebSocketService";

const Menu = () => {
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

    // Connect to server if not already connected
    if (!WebSocketService.socket) {
      WebSocketService.connect("127.0.0.1", "8080", false).then();
    }

    window.addEventListener("menuUpdate", menuUpdateHandler);
  }, []);

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

  const removeItemFromCart = (hash) => {
    if (hash === 0) {
      closeModal();
      renderCartSize(0);
      renderCartItems([]);
    } else {
      renderCartSize(cartSize - 1);
      const newCartItems = cartItems.filter((cartItem) => cartItem[1] !== hash);
      renderCartItems(newCartItems);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // callback listener for itemcard
  const handleItemClick = (clickedItem) => {
    addItemToCart(clickedItem);
  };

  // render the pages if the data is loaded
  if (isLoading) {
    return (
      <div className="flex justify-center item-center h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stop-color="#FE0435"></stop>
            <stop offset=".3" stop-color="#FE0435" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#FE0435" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#FE0435" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#FE0435" stop-opacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="200 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#FE0435"
            stroke-width="15"
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    ); // if data is loading, rending a loading pages
  } else {
    return (
      <div className="font-tt-norms-pro">
        {
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
                      <ItemCard item={item} onItemClick={openModal} />
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
        }
      </div>
    );
  }
};

export default Menu;

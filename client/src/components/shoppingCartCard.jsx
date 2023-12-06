import React from "react";
import { AiOutlineMessage } from "react-icons/ai";

const ShoppingCartCard = ({ item, removeFromCart }) => {
  const selfItem = item[0];
  const itemImage = selfItem.image;
  const itemPrice = selfItem.itemPrice;
  const itemName = selfItem.itemName;
  const itemHash = item[1];

  const removeItemFromCart = () => {
    removeFromCart(itemHash);
  };

  return (
    <div className="flex justify-between md:flex-row flex-col bg-gray-100 rounded-lg shadow-md px-2">
      {/* Item Content */}
      <div className="flex">
        <img
          src={itemImage}
          alt={itemName}
          className="h-24 object-cover"
          loading="lazy"
        />
        <div className="p-5">
          <div className="flex flex-column text-lg font-semibold">
            {itemName}
          </div>
          <div className="flex flex-column">
            <div className="text-gray-600">${itemPrice}</div>
          </div>
        </div>
      </div>
      {/* Customizaton */}
      <div className="flex items-center md:mt-0 md:mb-0 mt-4 mb-4 justify-center">
        {/* Item Notes */}
        {/* <button className="mx-2">
          <AiOutlineMessage size={30} />
        </button> */}
        <div className="flex flex-col">
          {/* Item Remove */}
          <div className="flex justify-center text-sm text-red-600">
            <button onClick={removeItemFromCart}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCartCard;

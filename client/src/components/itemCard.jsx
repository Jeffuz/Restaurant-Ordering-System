import React, { useState, useEffect } from "react";

/*const ItemCard = ({ image, itemName, itemPrice }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={image} alt={itemName} className="w-full h-64 object-cover" loading="lazy" />
            <div className="p-4 md:p-6">
                <div className="text-lg font-semibold">{itemName}</div>
                <div className="text-gray-600">${itemPrice}</div>
            </div>
        </div>
    );
};*/

const ItemCard = ({ item, onItemClick }) => {
    const [selfItem, setSelfItem] = useState(null);
    const id = item.id;
    const image = `data:image/png;base64,${item.image}`; //item.image;
    const itemName = item.itemName;
    const itemPrice = item.itemPrice;

    useEffect(() => {
        setSelfItem(item);
    }, [item]);

    const handleItemClick = () => {
        console.log("itemcard handleItemClick clicked!");
        console.log(selfItem);
        if (onItemClick) {
            onItemClick(selfItem);
        }
    };

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:cursor-pointer"
            onClick={handleItemClick}
        >
            <img
                src={image}
                alt={itemName}
                className="w-full h-64 object-cover"
                loading="lazy"
            />
            <div className="p-4 md:p-6">
                <div className="text-lg font-semibold">{itemName}</div>
                <div className="text-gray-600">${itemPrice}</div>
            </div>
        </div>
    );
};

export default ItemCard;
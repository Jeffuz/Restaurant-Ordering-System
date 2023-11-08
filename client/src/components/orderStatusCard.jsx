import React from 'react';

const OrderStatusCard = ({ itemImage, itemName, itemOrderNum, itemCount, itemStatus }) => {
    return (
        <div>
            <img src={itemImage} alt={itemName} />
            <div>Name: {itemName}</div>
            <div>Order Number: #{itemOrderNum}</div>
            <div>Count: {itemCount}</div>
            <div>Status: {itemStatus}</div>
        </div>
    );
}

export default OrderStatusCard;

import React from "react";

const OrderStatusCard = ({
  itemImage,
  itemName,
  itemOrderNum,
  itemCount,
  itemStatus,
}) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 flex items-center justify-between rounded-lg shadow-md">
      <div className="mr-4">
        <img src={itemImage} alt={itemName} className="h-16 object-cover" />
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-xl leading-none">{itemName}</div>
        <div className="font-semibold text-xl leading-none">
          Order #{itemOrderNum}
        </div>
        <div className="text-gray-500 font-normal text-sm leading-tight">
          Quantity: {itemCount}
        </div>
      </div>
      <div className="text-gray-500">{itemStatus}</div>
    </div>
  );
};

export default OrderStatusCard;

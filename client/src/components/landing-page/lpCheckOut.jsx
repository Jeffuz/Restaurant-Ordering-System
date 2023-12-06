import React from "react";

const LpCheckOut = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
        <button className="flex justify-end p-5 fixed">
          <AiOutlineClose onClick={onClose} size={20} />
        </button>
        <div className="flex justify-center text-3xl p-3">Checkout</div>
        <div className="h-screen overflow-y-auto">
          <div className="grid grid-cols-3 gap-8 p-8">
            {cartItems.map((cartItem) => (
              <ShoppingCartCard
                itemImage={cartItem.itemImage}
                itemName={cartItem.itemName}
                itemPrice={cartItem.itemPrice}
                itemCounter={cartItem.itemCount}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-end">
          <button className="font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5">
            <div className="flex items-center gap-1">
              <FaShoppingCart size={20} />
              Check Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpCheckOut;

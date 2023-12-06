import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ShoppingCartCard from "../shoppingCartCard";
import { BsFillSendFill } from "react-icons/bs";

const LpShoppingCart = ({
  isOpen,
  onClose,
  cartItems,
  cartSize,
  renderCartSize,
  removeFromCart,
  WebSocketService,
}) => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const calculateCosts = () => {
    let sum = 0;
    cartItems.forEach((cartItem) => {
      sum += cartItem[0].itemPrice;
    });
    setSubTotal(sum.toFixed(2));
    const calcTax = 0.07 * sum;
    setTax(calcTax.toFixed(2));
    const calcTotal = sum + calcTax;
    setTotal(calcTotal.toFixed(2));
  };
  useEffect(() => {
    /*const sum = cartItems.reduce((accu, cartItem) => {
            return accu + cartItem[0].itemPrice * cartItem[0].itemCount;
        }, 0);*/
    calculateCosts();
  });

  // Send order to server and wipe cart
  const sendOrder = () => {
    WebSocketService.submitOrder(cartItems);
    removeFromCart(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        {/* Checkout Side */}
        <div className="">
          <div className="bg-white p-3 rounded-[25px] shadow-lg flex flex-col w-[75vw] h-[75vh]">
            <button className="flex justify-end p-5 fixed">
              <AiOutlineClose onClick={onClose} size={20} />
            </button>
            {/* <div className='flex justify-center text-3xl p-3'>Check Out</div> */}
            <div className="flex justify-center text-3xl p-3">
              Shopping Cart
            </div>

            <div className="h-screen overflow-y-auto">
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-8 p-8">
                {cartItems.map((cartItem) => (
                  <ShoppingCartCard
                    item={cartItem}
                    calculateCosts={calculateCosts}
                    cartSize={cartSize}
                    renderCartSize={renderCartSize}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-end">
              {/* Payment Amount */}
              <div className="flex flex-col p-4">
                <div className="flex justify-between gap-5">
                  <div>Subtotal: </div>
                  <div>${subTotal}</div>
                </div>
                <div className="flex justify-between">
                  <div className="">Tax: </div>
                  <div className="">${tax}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold text-lg">Total: </div>
                  <div className="font-bold text-lg">${total}</div>
                </div>
              </div>
              <button className="font-bold leading-10 rounded-3xl mx-auto px-3 bg-light-secondary text-white mb-3 mt-5">
                <div className="flex items-center gap-1" onClick={sendOrder}>
                  {" "}
                  {/* Change the onClick for submitting order */}
                  <BsFillSendFill size={20} />
                  Submit Order
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LpShoppingCart;

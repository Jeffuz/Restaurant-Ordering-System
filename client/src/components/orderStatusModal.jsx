import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import OrderStatusCard from './orderStatusCard';


const OrderStatusModal = ({ isOpen, onClose }) => {
    const cartItems = [
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemOrderNum: '69',
            itemCount: 5,
            itemStatus: 'pending' // pending, processing, completed
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemOrderNum: '69',
            itemCount: 5,
            itemStatus: 'pending' // pending, processing, completed
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemOrderNum: '70',
            itemCount: 6,
            itemStatus: 'processing' // pending, processing, completed
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemOrderNum: '70',
            itemCount: 6,
            itemStatus: 'processing' // pending, processing, completed
        },
        {
            itemImage: 'test/nacho-chips.png',
            itemName: 'Nacho chips',
            itemOrderNum: '71',
            itemCount: 7,
            itemStatus: 'completed' // pending, processing, completed
        },
        {
            itemImage: 'test/burger.png',
            itemName: 'burger',
            itemOrderNum: '72',
            itemCount: 7,
            itemStatus: 'completed' // pending, processing, completed
        },
    ];
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-[70%] h-[70%] p-3 rounded-[25px] shadow-lg flex flex-col overflow-hidden">
                <div className='flex justify-end p-5 fixed'>
                    <AiOutlineClose onClick={onClose} role='button' size={20} />
                </div>
                <div className='flex justify-center text-4xl font-bold p-[10px]'>
                    Order Status
                </div>
                {/* 3 columns */}
                <div className='grid grid-cols-3 m-8 text-2xl gap-5'>
                    <div className='flex flex-col'>
                        <span className='ml-5 font-semibold'>Order's Pending</span>
                        <div className='overflow-y-auto h-[50%]'>
                            {cartItems
                                .filter(cartItem => cartItem.itemStatus === 'pending')
                                .map((cartItem, index) => (
                                    <OrderStatusCard
                                        key={index}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemOrderNum={cartItem.itemOrderNum}
                                        itemCount={cartItem.itemCount}
                                        itemStatus={cartItem.itemStatus}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>Processing Order's</span>
                        <div className='overflow-y-auto h-[50%]'>
                            {cartItems
                                .filter(cartItem => cartItem.itemStatus === 'processing')
                                .map((cartItem, index) => (
                                    <OrderStatusCard
                                        key={index}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemOrderNum={cartItem.itemOrderNum}
                                        itemCount={cartItem.itemCount}
                                        itemStatus={cartItem.itemStatus}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className='flex flex-col' >
                        <span className='font-semibold'>Completed Order's</span>
                        <div className='overflow-y-auto h-[50%]'>
                            {cartItems
                                .filter(cartItem => cartItem.itemStatus === 'completed')
                                .map((cartItem, index) => (
                                    <OrderStatusCard
                                        key={index}
                                        itemImage={cartItem.itemImage}
                                        itemName={cartItem.itemName}
                                        itemOrderNum={cartItem.itemOrderNum}
                                        itemCount={cartItem.itemCount}
                                        itemStatus={cartItem.itemStatus}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderStatusModal
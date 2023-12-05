import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'

const ItemModal = ({ isOpen, onClose, parentCallback, item }) => {
    if (!isOpen) return null;

    const addToCart = () => {
        onClose();
        parentCallback(item);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-[70%] h-[70%] p-3 rounded-[25px] shadow-lg flex flex-col">
                <div className='flex justify-end p-5 fixed'>
                    <AiOutlineClose onClick={onClose} role='button' size={20} />
                </div>
                <div className='flex overflow-hidden'>
                    <img src={item.image} alt={item.itemName} loading='lazy' className='w-[50%] h-auto pl-8 object-cover' />
                    <div className='mt-8 flex flex-col px-12 justify-between'>
                        <div className='flex flex-col gap-3'>
                            <div className='font-medium text-4xl'>{item.itemName}</div>
                            <div className='flex flex-row gap-3 text-gray-600'>
                                {item.itemFilter.map((filter, index) => (
                                    <div key={index}>{filter}</div>
                                ))}
                            </div>
                            <div className='text-xl leading-10'>{item.itemContent}</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-row gap-3'>
                                {item.itemDiet.map((diet, index) => (
                                    <div key={index}>{diet}</div>
                                ))}
                            </div>
                            <div className='flex justify-center font-bold bg-[#D9D9D9] uppercase items-center rounded-[12.5px] py-4 px-6 ' role='button' onClick={addToCart}>
                                <FaShoppingCart />&nbsp;&nbsp;Add to cart
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;

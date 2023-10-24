import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'

const ItemModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-[70%] h-[70%] p-3 rounded-[25px] shadow-lg">
                <div className='flex justify-end p-5'>
                    <AiOutlineClose onClick={onClose} role='button' size={20} />
                </div>
                <div className='flex'>
                    <img src={item.image} alt={item.itemName} loading='lazy' className='w-[50%] h-auto pl-8' />
                    <div className='flex flex-col px-12'>
                        <div>{item.itemName}</div>
                        <div>{item.itemContent}</div>
                        <div className='flex flex-row gap-3'>
                            {item.itemDiet.map((diet, index) => (
                                <div key={index}>{diet}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemModal;

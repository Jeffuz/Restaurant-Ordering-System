import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Signup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-[75%] h-[75%] p-3 rounded-[25px] shadow-lg flex flex-col">
                <div className='flex justify-end p-5 fixed'>
                    <AiOutlineClose onClick={onClose} role='button' size={20} />
                </div>
            </div>
        </div>
    )
}

export default Signup

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'

const Banner = ({message, onClose}) => {
    return (
        <div className='bg-white rounded-sm fixed inset-0 h-[10%] shadow-xl'>
            <div className='flex justify-center'>
                <p>{message}</p>
            </div>
            <div className='flex mt-10 justify-center'>
                <AiOutlineClose onClick={onClose} role='button' size={20}/>
            </div>
        </div>
    )
};
export default Banner;
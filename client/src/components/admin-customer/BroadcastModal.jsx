import React, {useState} from 'react';
import { AiOutlineClose } from 'react-icons/ai'

const BroadcastModal = ({ isOpen, onClose}) => {
    //State for storing the message
    const [announcement, setAnnouncement] = useState('');
    const [displayAnnouncement, setDisplayAnnouncement] = useState(true);
    //set announcement to whatever user inputs in the text area
    const handleChange = (e) => {
        setAnnouncement(e.target.value)
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-[70%] h-[70%] p-3 rounded-[25px] shadow-lg flex flex-col">
                <div className='flex justify-end fixed'>
                    {/*Button to close the modal*/}
                    <AiOutlineClose onClick={onClose} role='button' size={20} />
                </div>
                {/*Text Area for Admin to input the announcement*/}
                 <textarea 
                    className='mt-12 mx-auto w-[90%] h-[80%] flex justify-center border border-gray-100 rounded-md shadow-md'
                    value={announcement}
                    onChange={handleChange}
                    placeholder='Enter your message here'
                 />
                 {/*Button for Admin to release the announcement*/}
                 <button 
                    className='mt-3 mx-auto bg-gray-300 w-[90%] h-12 shadow-lg rounded-md'
                  >
                    Release Message
                </button>
            </div>
        </div>
    )
}
export default BroadcastModal;
import React, {useState} from 'react';
import BroadcastModal from './BroadcastModal';
const BroadcastingSystem = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const openModal = () => {
    setDisplayModal(true);
  }
  const closeModal = () => {
    setDisplayModal(false);
  }
  return (
    <div>
      <div className='flex h-screen items-center justify-center text-xl'>
        <button className="bg-white w-[90%] h-[70%] rounded-lg overflow-hidden shadow-md" onClick={openModal}>Broadcast</button>
      </div>
      <BroadcastModal isOpen={displayModal} onClose={closeModal}/>
    </div>
  );
};

export default BroadcastingSystem;
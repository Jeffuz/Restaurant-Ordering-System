import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const EditRestaurant = ({ restaurantInfo, updateRestaurantInfo , saved}) => {
    //store edits of the fields
    const [newName, setNewName] = useState(restaurantInfo.name);
    const [newDescription, setNewDescription] = useState(restaurantInfo.description);
    const [newInstagram, setNewInstagram] = useState(restaurantInfo.instagram);
    const [newFacebook, setNewFacebook] = useState(restaurantInfo.facebook);
    const [newTwitter, setNewTwitter] = useState(restaurantInfo.newTwitter);


    const handleSave = () => {
      //update restaurant info using the provided function
        updateRestaurantInfo({ name: newName, description: newDescription, instagramLink: newInstagram, facebookLink: newFacebook, twitterLink: newTwitter,});
    };

    return (
        <div className="flex flex-col items-center justify-content h-screen ">
            <div className="bg-white p-8 rounded-3xl shadow-md flex flex-col p-[3em] w-full max-w-screen-md ">
                
                    <div className="mb-4 text-2xl block flex items-center justify-center">Edit Details</div>
                        <div className="mb-4">
                            <label className="text-2xl block">Restaurant Name:</label>
                            <input className="border border-gray-300 p-2 rounded-md w-full max-h-6 overflow-x-auto max-w-full" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="text-2xl block">Restaurant Description:</label>
                            <textarea
                                className="border border-gray-300 p-2 rounded-md w-full overflow-y-auto max-w-full"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row items-center justify-content">
                                <FaFacebook className="mr-2 text-2xl"/>
                                <label className="text-2xl block">Facebook Link:</label>
                            </div>
                            
                            <input
                                className="border border-gray-300 p-2 rounded-md w-full max-h-8 overflow-x-auto max-w-full"
                                value={newFacebook}
                                onChange={(e) => setNewFacebook(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row items-center justify-content">
                                <FaInstagram className="mr-2 text-2xl"/>
                                <label className="text-2xl block">Instagram Link:</label>
                            </div>
                            <input
                                className="border border-gray-300 p-2 rounded-md w-full max-h-8 overflow-x-auto max-w-full"
                                value={newInstagram}
                                onChange={(e) => setNewInstagram(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row items-center justify-content">
                                <FaTwitterSquare className="mr-2 text-2xl"/>
                                <label className="text-2xl block">Twitter Link:</label>
                            </div>
                            <input
                                className="border border-gray-300 p-2 rounded-md w-full max-h-8 overflow-x-auto w-full max-w-full"
                                value={newTwitter}
                                onChange={(e) => setNewTwitter(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-between">
                            <div className="flex items-center justify-center">
                                <button className="bg-gray-200 mb-2 hover:ring-2 hover:ring-blue text-black py-2 px-6 rounded-md mr-2 text-center text-xl font-medium flex items-center justify-center space-x-2" 
                                        onClick={handleSave}>Save</button>
                            </div>

                            {saved && (
                                <div className="flex items-center font-medium justify-center text-blue-500  text-center"> Saved Details! </div>

                            )}

                        </div>

               
               
               

            </div>
            
        </div>
    );
};

export default EditRestaurant;
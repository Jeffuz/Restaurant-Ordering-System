import React, { useState } from 'react';

const EditRestaurant = ({ restaurantInfo, updateRestaurantInfo }) => {
    //store edits of the fields
    const [newName, setNewName] = useState(restaurantInfo.name);
    const [newDescription, setNewDescription] = useState(restaurantInfo.description);
    const [newInstagram, setNewInstagram] = useState(restaurantInfo.instagram);
    const [newFacebook, setNewFacebook] = useState(restaurantInfo.facebook);
    const [newTwitter, setNewTwitter] = useState(restaurantInfo.newTwitter);


    const handleSave = () => {
      //update restaurant info using the provided function
        updateRestaurantInfo({ name: newName, description: newDescription });
    };

    return (
        <div className="flex flex-col items-center justify-content h-screen">
            <div className="bg-white p-8 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="text-3xl block">Restaurant Name:</label>
                    <input className="border border-gray-300 p-2 rounded-md w-full" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label className="text-3xl block">Restaurant Description:</label>
                    <textarea
                         className="border border-gray-300 p-2 rounded-md w-full"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-3xl block">Facebook:</label>
                    <textarea
                        className="border border-gray-300 p-2 rounded-md w-full"
                        value={newFacebook}
                        onChange={(e) => setNewFacebook(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-3xl block">Instagram:</label>
                    <textarea
                        className="border border-gray-300 p-2 rounded-md w-full"
                        value={newInstagram}
                        onChange={(e) => setNewInstagram(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-3xl block">Twitter:</label>
                    <textarea
                        className="border border-gray-300 p-2 rounded-md w-full"
                        value={newTwitter}
                        onChange={(e) => setNewTwitter(e.target.value)}
                    />
                </div>

                <div>
                    <button className="bg-gray-200 text-black py-2 px-6 rounded-md mr-2 text-center text-xl font-medium flex items-center space-x-2" 
                            onClick={handleSave}>Save Changes</button>
                </div>

            </div>
            
        </div>
    );
};

export default EditRestaurant;
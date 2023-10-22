import React, { useState, useEffect } from 'react';
import Camera from '../admin-menu/camera-circle.png'

const AddEditMenuItemForm = ({ selectedItem, addMenuItem, editMenuItem, deleteMenuItem, setIsOpen }) => {
    const [itemData, setItemData] = useState(selectedItem || {});


    useEffect(() => {
        if (!selectedItem) {
            setItemData({
                name: '',
                price: '',
                description: '',
                photo: '', 
            });
        }
    }, [selectedItem]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const handleSubmit = () => {
        if (selectedItem) {
            editMenuItem(itemData);
        } else {
            itemData.id = Date.now();
            addMenuItem(itemData);
        }
    };

    const handleDelete = () => {
        if (selectedItem) {
           
            deleteMenuItem(selectedItem.id);
            setIsOpen(false); 
        }
    };

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setItemData({
                    ...itemData,
                    photo: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="flex">
            <div className="w-2/5 p-8 bg-gray-100 relative">
                {itemData.photo ? (
                    <div>
                        <img
                            src={itemData.photo}
                            alt="Selected Image"
                            className="w-full h-auto"
                        />
                        <button
                            className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-md mr-2 text-center text-xl font-montserrat font-medium"
                            onClick={() => setItemData({ ...itemData, photo: '' })}
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <label className="custom-file-label">
                        <img
                            src={Camera}
                            alt="Choose File"
                            className="file-button"
                        />
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files)}
                            className="custom-file-input"
                        />
                    </label>
                )}
            </div>

            <div className="w-3/5 p-4">
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={itemData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        name="price"
                        placeholder="Item Price"
                        value={itemData.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={itemData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
               

                <button className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-md mr-2 text-center text-xl font-montserrat font-medium" onClick={handleSubmit}>
                    {selectedItem ? 'Save' : 'Add Item'}
                </button>

                {/* {selectedItem && ( */}
                    <button className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-md mr-2 text-center text-xl font-montserrat font-medium" onClick={handleDelete}>
                        Delete
                    </button>


                {/* )} */}
                
            
            </div>
        </div>
    );
};

export default AddEditMenuItemForm;

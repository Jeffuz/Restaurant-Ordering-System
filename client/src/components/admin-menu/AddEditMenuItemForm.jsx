import React, { useState } from 'react';
import ReactModal from 'react-modal';

const AddEditMenuItemForm = ({ selectedItem, addMenuItem, editMenuItem, deleteMenuItem }) => {
    const [itemData, setItemData] = useState(selectedItem || {});

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
            
            <div className="w-1/2 p-4">
                <img
                    src={itemData.photo}
                    alt={itemData.name}
                    className="w-full h-auto"
                />
            </div>

            <div className="w-1/2 p-4">
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
                <div className="mb-2">
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded" onClick={handleSubmit}>
                    {selectedItem ? 'Save' : 'Add Item'}
                </button>
                {selectedItem && (
                    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded" onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddEditMenuItemForm;

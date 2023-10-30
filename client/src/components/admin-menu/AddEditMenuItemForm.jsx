import React, { useState, useEffect } from 'react';
import Camera from '../admin-menu/camera-circle.png';
import Trash from '../admin-menu/trash-icon.png';
import Check from '../admin-menu/check-circle.png';

const AddEditMenuItemForm = ({ selectedItem, addMenuItem, editMenuItem, deleteMenuItem, setIsOpen }) => {
    const [itemData, setItemData] = useState(selectedItem || {});
    const [editMode, setEditMode] = useState({
        id: false,
        image: false, 
        itemName: false,
        itemPrice: false,
        itemFilter: false,
        itemDiet: false,
        itemContent: false,
    });

    useEffect(() => {
        if (!selectedItem) {
            setItemData({
                itemName: '',
                itemFilter: '',
                itemDiet: '',
                itemPrice: '',
                itemContent: '',
                image: '',
            });
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const handleEditToggle = (field) => {
        console.log("making edits")
        setEditMode({ ...editMode, [field]: !editMode[field] });
    };

    const handleSubmit = () => {
        if (selectedItem) {
            editMenuItem(itemData); // Update the selected item
        } else {
            itemData.id = Date.now();
            addMenuItem(itemData); // Add a new item
        }
        // Close the modal
        //setIsOpen(false);
    };

    const handleDelete = () => {
        if (selectedItem) {
            deleteMenuItem(selectedItem.id); // Delete the selected item
            
        }
    };

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setItemData({
                    ...itemData,
                    image: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col ">
            <div className="flex">
                <div className="w-3/5 p-8 bg-gray-100 relative">
                    {itemData.image ? (
                        <div>
                            <img src={itemData.image} alt="Selected Image" className="w-full h-auto" />
                            <button
                                className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-md mr-2 text-center text-xl font-montserrat font-medium"
                                onClick={() => setItemData({ ...itemData, image: '' })}
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <label className="custom-file-label">
                            <img src={Camera} alt="Choose File" className="file-button" />
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

                <div className="w-1/2 p-4">
                    <div className="mb-2">
                        {editMode.itemName ? (
                            <input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                value={itemData.itemName}
                                onChange={handleChange}
                                className="w-full break-all p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <div className="w-4/5 max-w-md">
                                <span class="w-[522px] h-[49px] text-black text-[40px] font-medium font-['Montserrat']" style={{
                                
                                    fontSize: '40px',
                                    fontWeight: 500,
                                    lineHeight: '49px',
                                    letterSpacing: '0em',
                                }}>{
                                
                                itemData.itemName || 'Item Name'}</span>
                                <button onClick={() => handleEditToggle('itemName')}>✎</button>
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        {editMode.itemPrice ? (
                            <input
                                type="text"
                                name="price"
                                placeholder="Item Price"
                                value={itemData.itemPrice}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <div className="w-4/5 max-w-md"> 
                                <span className="text-xl break-all">{itemData.itemPrice || 'Item Price'}</span>
                                <button onClick={() => handleEditToggle('itemPrice')}>✎</button>
                            </div>
                        )}
                    </div>
                    <div className="mb-2 ">
                        {editMode.itemContent ? (
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={itemData.itemContent}
                                onChange={handleChange}
                                className="w-full break-all p-2 border border-gray-300 rounded"
                            />
                        ) : (
                            <div className="w-4/5 max-w-md">
                                <span className="text-xl break-all">{itemData.itemContent || 'Description'}</span>
                                <button onClick={() => handleEditToggle('itemContent')}>✎</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-4 p-4">
                <button className="bg-gray-200 text-black font-semibold py-2 px-6 rounded-md mr-2 text-center text-xl font-montserrat font-medium flex items-center space-x-2" onClick={handleSubmit}>
                    <img src={Check} alt="Save Icon" className="w-4 h-4" />
                    <span>{selectedItem ? 'Save' : 'Add Item'}</span>
                </button>

                {/* {selectedItem && ( */}
                <button className="bg-gray-200 text-black font-semibold py-2 px-6 rounded-md mr-2 text-center text-xl font-montserrat font-medium flex items-center space-x-2" onClick={handleDelete}>
                    <img src={Trash} alt="Delete Icon" className="w-4 h-4" />
                    <span>Delete</span>
                </button>
                {/* // )} */}
            </div>
        </div>
    );
};

export default AddEditMenuItemForm;

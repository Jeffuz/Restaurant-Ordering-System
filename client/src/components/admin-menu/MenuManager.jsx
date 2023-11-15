import React, { useState, useEffect } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'
import AddItemButton from '../admin-menu/AddItemButton';
import ReactModal from 'react-modal';
import ItemModal from '../itemModal';
import ItemCard from '../itemCard';
import FilterBar from '../filterbar';
import AddCategoryTextBox from '../AddCategoryTextBox';
import { IoIosAddCircle } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'

import WebSocketService from '../../WebSocketService';
const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);

    //filterbar stuff
    const [filterCategories, setFilterCategories] = useState([
        "All", "Breakfast", "Lunch", "Dinner"
    ]);
    const [newFilterCategory, setNewFilterCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isEditCategoryOn, setIsEditCategoryOn] = useState(false);


    //for modal popup
    const [isOpen, setIsOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    //add category 
    const [showAddCategoryTextBox, setShowAddCategoryTextBox] = useState(false);

    const [isLoading, setIsLoading] = useState(true); // used to save whether data is loading 

    /*function getMenu() {
        const actionObject = {
            'action': 'GETMENUS',
            'restaurantId': '65381ed4030fa645be95b250'
        };

        WebSocketService.sendRequest(actionObject);
    }*/

    useEffect(() => {
        const menuUpdateHandler = (event) => {
            console.log("Menu update received!");
            const menuList = event.detail.data;
            setMenuItems(menuList.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            })));
        }

        window.addEventListener('menuUpdate', menuUpdateHandler);

    }, []);

    /*useEffect(() => {
        if (!WebSocketService.socket) {
            alert('not alive');
            WebSocketService.connect()
            .then(() => {
                console.log("starting");
                getMenu();
                console.log('done');
            })
        }else{
            alert("was alive")
            getMenu();
        }
        //getMenu();

        const menuUpdateHandler = (event) => {
            const menuList = event.detail.data;
            setMenuItems(menuList.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            })));
        }

        window.addEventListener('menuUpdate', menuUpdateHandler);

        return () => {
            window.removeEventListener('menuUpdate', menuUpdateHandler);
        };
    }, []);*/

    const addMenuItem = (newItem) => {
        const actionObject = {
            "action": "CREATEMENU",
            "restaurantId": "65381ed4030fa645be95b250",
            "menuId": newItem.itemName,
            "image": newItem.image,
            "filter": [], // havent support
            "name": newItem.itemName,
            "price": newItem.itemPrice,
            "description": newItem.itemContent,
            "diet": [] // havent support
        };

        WebSocketService.sendRequest(actionObject);
    }

    const deleteMenuItem = (itemId) => {
        const actionObject = {
            "action": "DELETEMENU",
            "restaurantId": "65381ed4030fa645be95b250",
            "menuId": itemId
        };

        WebSocketService.sendRequest(actionObject);
    }

    const editMenuItem = (editedItem) => {
        const actionObject = {
            "action": "EDITMENU",
            "restaurantId": "65381ed4030fa645be95b250",
            "menuId": editedItem.itemName,
            "image": editedItem.image,
            "filter": [], // havent support
            "name": editedItem.itemName,
            "price": editedItem.itemPrice,
            "description": editedItem.itemContent,
            "diet": [] // havent support
        };

        WebSocketService.sendRequest(actionObject);
    }

    // for modal popup editing and adding 
    const closeModal = () => {
        setIsOpen(false);
        setShowForm(false);
        setIsFormOpen(false);

    };

    const openModalAdd = () => {
        setSelectedItem(null);
        setShowForm(true)
        setIsOpen(true)
        setIsFormOpen(true);
    }
    const openModalEdit = (item) => {
        console.log("Trying to open the modal for editing:", item);
        setSelectedItem(item);
        setShowForm(true);
        setIsOpen(true);
        setIsFormOpen(true);
    }



    //for filter bar component
    const addFilterCategory = () => {
        if (newFilterCategory.trim() !== "") {
            setFilterCategories([...filterCategories, newFilterCategory]);
            setNewFilterCategory(""); // Clear the input field
        }
    };

    const openEditCategoryMenu = (category) => {
        setSelectedCategory(category);
        setIsEditCategoryOn(true);



    }

    const closeEditCategoryMenu = () => {
        setSelectedCategory(null);
        setIsEditCategoryOn(false);
    }

    const onEditCategory = (categoryToEdit) => {
        // Find the index of the category to edit
        const categoryIndex = filterCategories.indexOf(categoryToEdit);

        if (categoryIndex !== -1) {
            const updatedCategoryName = prompt("Edit category name:", categoryToEdit);

            if (updatedCategoryName !== null && updatedCategoryName.trim() !== '') {

                filterCategories[categoryIndex] = updatedCategoryName;
                setFilterCategories([...filterCategories]);
            }
        }
    };

    const onDeleteCategory = (categoryToDelete) => {
        const updatedCategories = filterCategories.filter((category) => category !== categoryToDelete);
        setFilterCategories(updatedCategories);
    };


    const handleAddCategory = (newCategory) => {
        setFilterCategories([...filterCategories, newCategory]);
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className='mb-8'>
                <h1 className="text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6">Menu</h1>

                {/* Filter Bar */}
                <div className="">
                    <FilterBar
                        filterCategories={filterCategories}
                        onEdit={onEditCategory}
                        onDelete={onDeleteCategory}
                        onAddCategory={handleAddCategory}
                        isAdmin={isAdmin}
                    />

                    {/* {showAddCategoryTextBox ? (
                        <AddCategoryTextBox onAddCategory={handleAddCategory} />
                            ) : (
                                <button onClick={() => setShowAddCategoryTextBox(true)}><IoIosAddCircle /></button>
                            )}
                        <button onClick={addFilterCategory}> <IoIosAddCircle /> </button> */}
                </div>
            </div>

            <div className="flex">
                {/* Modal for item cards */}
                {showForm && (
                    <ReactModal isOpen={isFormOpen} onRequestClose={closeModal}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            },
                            content: {
                                width: '70%',
                                height: '70%',
                                margin: 'auto', // Center the modal horizontally
                                borderRadius: '1rem',
                            },
                        }}
                    >
                        <div className='flex justify-end'>
                            <button onClick={closeModal} className="text-xl font-bold">
                                <AiOutlineClose />
                            </button>
                        </div>
                        <AddEditMenuItemForm
                            selectedItem={selectedItem}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
                            setIsOpen={setIsOpen}
                            deleteMenuItem={deleteMenuItem}
                        />
                    </ReactModal>
                )}
            </div>

            <div className='overflow-y-auto h-screen'>
                <div className="grid grid-cols-5 gap-8 ">
                    <AddItemButton onClick={openModalAdd} />

                    {menuItems.map((item) => (
                        <div key={item.id} onClick={() => openModalEdit(item)}>
                            <ItemCard
                                key={item.id}
                                image={item.image}
                                itemName={item.itemName}

                                itemFilter={item.itemFilter}
                                itemPrice={item.itemPrice}
                                itemContent={item.itemContent}
                                itemDiet={item.itemDiet}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* {selectedItem && (
                <ItemModal isOpen={isOpen} onClose={closeModal} item={selectedItem} />
            )} */}


            {/* {selectedItem && (

                <ReactModal isOpen={isOpen} onRequestClose={closeModal}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        },
                        content: {
                            width: '70%',  // Adjust the width as needed, e.g., '50%' for 50% of the parent container's width
                            height: '70%', // Adjust the height as needed, e.g., '50%' for 50% of the parent container's height
                            margin: 'auto', // Center the modal horizontally
                            borderRadius: '1rem',
                        },
                    }}
                >
                    <div className="flex justify-end p-4">
                        <button onClick={closeModal} className="close-button text-xl font-bold">
                            X
                        </button>
                    </div>
                    <AddEditMenuItemForm
                        selectedItem={selectedItem}
                        editMenuItem={editMenuItem}
                        deleteMenuItem={deleteMenuItem}
                        closeModal={closeModal}
                    />
                </ReactModal>
            )} */}
        </div>
    )
}
export default MenuManager;
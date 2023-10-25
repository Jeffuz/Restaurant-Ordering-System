import React, { useState, useEffect } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'
import AddItemButton from '../admin-menu/AddItemButton';
import MainMenuCard from '../admin-menu/MainMenuCard';
import ReactModal from 'react-modal';
import FilterBar from '../filterbar';
import AddCategoryTextBox from '../AddCategoryModal';
import { IoIosAddCircle } from 'react-icons/io'
const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    //const [categories, setCategories] = useState(['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert']);
    
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


    // creates inital menu items for testing 
    useEffect(() => {
        // fetch initial menu items from a server or set sample data here.

        const sampleMenuItems = [
          {
            id: 1,
            name: 'Burger',
            price: '3',
            photo: '../admin-menu/burger.jpg',
            description: 'A classic beef burger with lettuce and tomato.',
          },
          {
            id: 2,
            name: 'Pasta',
            price: '12',
            photo: 'pasta.jpg',
            description: 'Delicious pasta with tomato sauce.',
          },
          
        ];
    
        setMenuItems(sampleMenuItems);
    }, []);

    


    // for add delete edit actions
    const addMenuItem = (newItem) => {
        // adds the new item to the end of menuItem list 
        setMenuItems([...menuItems, newItem]);
        setShowForm(false);
        setSelectedItem(null);
    };


    const deleteMenuItem = (itemId) => {
        const updatedItems = menuItems.filter((item) => item.id !== itemId);
        setMenuItems(updatedItems);
        setSelectedItem(null);
    };

    const editMenuItem = (editedItem) => {
        //checks to see if item exists, then adds to exisitng item, else new item is added
        const updatedItems = menuItems.map((item) => item.id == editedItem.id ? editedItem : item);
        setMenuItems(updatedItems);
        setSelectedItem(null);
        setShowForm(false);
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
        setSelectedItem(item);
        setShowForm(true)
        setIsOpen(true)
        setIsFormOpen(true);
    }


  
    //for filter bar component
    const addFilterCategory = () => {
        if (newFilterCategory.trim() !== "") {
            setFilterCategories([...filterCategories, newFilterCategory]);
            setNewFilterCategory(""); // Clear the input field
        }
    };

    const openEditCategoryMenu = (category ) => {
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
                // Update the category name in the array
                filterCategories[categoryIndex] = updatedCategoryName;
                setFilterCategories([...filterCategories]); // Trigger a state update
            }
        }
    };

    const onDeleteCategory = (categoryToDelete) => {
        const updatedCategories = filterCategories.filter((category) => category !== categoryToDelete);
        setFilterCategories(updatedCategories);
    };

    const handleAddCategory = (newCategory) => {
        setFilterCategories([...filterCategories, newCategory]);
        setShowAddCategoryTextBox(false);
    };

    


    return (
        <div>
        <div >

            <h1 className="text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6">Menu</h1>
            <div className="addFilterCategory">
                <FilterBar filterCategories={filterCategories} onEdit={onEditCategory} onDelete={onDeleteCategory} />

                {showAddCategoryTextBox ? (
                    <AddCategoryTextBox onAddCategory={handleAddCategory} />
                        ) : (
                            <button onClick={() => setShowAddCategoryTextBox(true)}><IoIosAddCircle /></button>
                        )}
                    {/* <button onClick={addFilterCategory}> <IoIosAddCircle /> </button> */}
            </div>
            
            </div>
            

            <div className="addEditItemButton flex justify-end p-4">
            
                {showForm && (
                    <ReactModal  isOpen={isFormOpen} onRequestClose={closeModal}
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
                        {/* <div>
                            <button onClick={closeModal} className="text-xl font-bold">
                                X
                            </button>
                        </div> */}
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

            
            <div className="menu-list flex flex-wrap p-4">
                    <AddItemButton onClick={openModalAdd} />
                    {menuItems.map((item) => (
                        <MainMenuCard
                            key={item.id}
                            item={item}
                            
                            onClick={() => openModalEdit(item)}
                            onCardClick={(item) => setSelectedItem(item)}
                        />
                    ))}
                    
            </div>


            {selectedItem && (
            
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
                    {/* <div className="flex justify-end p-4">
                        <button onClick={closeModal} className="close-button text-xl font-bold">
                            X
                        </button>
                    </div> */}
                    <AddEditMenuItemForm
                        selectedItem={selectedItem}
                        editMenuItem={editMenuItem}
                        deleteMenuItem={deleteMenuItem}
                        closeModal={closeModal}
                    />
                </ReactModal>
            )}
        




            
        </div>

    );

}
export default MenuManager;
import React, { useState, useEffect } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'
import AddItemButton from '../admin-menu/AddItemButton';
import MainMenuCard from '../admin-menu/MainMenuCard';
import ReactModal from 'react-modal';
import CategoryNavBar from '../admin-menu/CategoryNavBar';
const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [categories, setCategories] = useState(['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert']);



    const [isOpen, setIsOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    


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

    
    console.log(menuItems)

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


    const handleAddCategory = (newCategory) => {
        // Ensure the new category doesn't already exist
        if (!categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
        }
    };


    return (
        <div>

            <h1 className="text-center mt-27 text-black font-Montserrat text-4xl font-bold">Menu</h1>


            <CategoryNavBar
                categories={categories}
                
                
                onAddCategory={handleAddCategory}
            />

            <div className="addEditItemButton flex justify-end p-4">
            
                {showForm && (
                    <ReactModal  isOpen={isFormOpen} onRequestClose={closeModal }>
                        {/* <div>
                            <button onClick={closeModal} className="text-xl font-bold">
                                X
                            </button>
                        </div> */}
                        <AddEditMenuItemForm
                            selectedItem={selectedItem}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
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
            
                <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
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
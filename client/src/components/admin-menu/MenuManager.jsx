import React, { useState } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'

const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    //const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    // const [selectedCategory, setSelectedCategory] = useState('All'); // Default to showing all items

    // const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert'];

    // const onSelectCategory = (category) => {
    //     setSelectedCategory(category);

    // }
    // const deleteMenuItem = (itemId) => {
    //     const updatedItems = menuItems.filter((item) => item.id !== itemId);
    //     setMenuItems(updatedItems);
    //     setSelectedItem(null);
    // };


    return (
        <div>

            <div className="addItemButton">
                <button onClick={() => setShowForm(true)}>
                    +
                </button>
                {showForm && (
                    <AddEditMenuItemForm
                        selectedItem={selectedItem}
                        // addMenuItem={addMenuItem}
                        // editMenuItem={editMenuItem}
                    />


                )}
            </div>

            {/* <div className="menuItems">

                
            </div> */}




            
        </div>

    );

}

export default MenuManager;
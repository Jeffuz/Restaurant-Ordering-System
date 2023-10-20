import React, { useState } from 'react'


const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default to showing all items

    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert'];

    const onSelectCategory = (category) => {
        setSelectedCategory(category);

    }


    return (
        <div>

            <div className="addItemButton">
                <button onClick={() => setShowForm(true)}>
                    +
                </button>
                {showForm && (
                    


                )}
            </div>

            <div className="menuItems">

                
            </div>




            
        </div>

    );

}

export default MenuManager;
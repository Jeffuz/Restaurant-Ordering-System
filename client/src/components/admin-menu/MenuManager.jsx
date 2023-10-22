// import React, { useState, useEffect } from 'react'
// import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'

// import MainMenuCard from '../admin-menu/MainMenuCard';
// import ReactModal from 'react-modal';

// const MenuManager = () => {

//     const [showForm, setShowForm] = useState(false)
//     const [menuItems, setMenuItems] = useState([])
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState('All'); // Default to showing all items

//     const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert'];


//     const [isAddModalOpen, setAddModalOpen] = useState(false);
//     const [isEditModalOpen, setEditModalOpen] = useState(false);
    


//     useEffect(() => {
//         // fetch initial menu items from a server or set sample data here.

//         const sampleMenuItems = [
//           {
//             id: 1,
//             name: 'Burger',
//             price: '3',
//             photo: 'burger.jpg',
//             description: 'A classic beef burger with lettuce and tomato.',
//           },
//           {
//             id: 2,
//             name: 'Pasta',
//             price: '12',
//             photo: 'pasta.jpg',
//             description: 'Delicious pasta with tomato sauce.',
//           },
          
//         ];
    
//         setMenuItems(sampleMenuItems);
//     }, []);

//     const filteredMenuItems = selectedCategory === 'All'
//     ? menuItems
//     : menuItems.filter(item => item.category === selectedCategory);


//     const onSelectCategory = (category) => {
//         setSelectedCategory(category);

//     }

//     const addMenuItem = (newItem) => {
//         // adds the new item to the end of menuItem list 
//         setMenuItems([...menuItems, newItem]);
//         setShowForm(false);
//         setSelectedItem(null);
        
//     };


//     const deleteMenuItem = (itemId) => {
//         const updatedItems = menuItems.filter((item) => item.id !== itemId);
//         setMenuItems(updatedItems);
//         setSelectedItem(null);
//     };

//     const editMenuItem = (editedItem) => {
//         //checks to see if item exists, then adds to exisitng item, else new item is added
//         const updatedItems = menuItems.map((item) => item.id == editedItem.id ? editedItem : item);
//         setMenuItems(updatedItems);
//         setSelectedItem(null);
        
//         setShowForm(false);
//     }

//     const closeModal = () => {
//         setAddModalOpen(false); // Close the "Add Item" modal
//         setEditModalOpen(false);
//         setShowForm(false);
        
//     };

//     const openModalAdd = () => {
//         setSelectedItem(null);
//         setShowForm(true);

//         setAddModalOpen(true); 
//     }
//     const openModalEdit = (item) => {
//         setSelectedItem(item);
//         setShowForm(true);
  
//         setEditModalOpen(true);
//     }

//     return (
//         <div>

//             <div className="addEditItemButton">
//                 <button onClick={openModalAdd}>
//                     Add Item +
//                 </button>

//                 {showForm && (
//                     <ReactModal  isOpen={isAddModalOpen} onRequestClose={() => setAddModalOpen(false) }>
//                         <div>
//                             <button onClick={closeModal} className="close-button">
//                                 X
//                             </button>
//                         </div>
//                         <AddEditMenuItemForm
//                             selectedItem={selectedItem}
//                             addMenuItem={addMenuItem}
//                             editMenuItem={editMenuItem}
//                             deleteMenuItem={deleteMenuItem}
                            
//                         />
//                     </ReactModal>


//                 )}
//             </div>


//             <div className="menu-list">
//                     {menuItems.map((item) => (
//                         <MainMenuCard
//                             key={item.id}
//                             item={item}
//                             isOpen={isEditModalOpen}
//                             onRequestClose={() => setEditModalOpen(false)}
//                             onClick={() => openModalEdit(item)}
//                             onCardClick={(item) => setSelectedItem(item)}
//                         />
//                     ))}
//             </div>

//             {selectedItem && (
            
//                 <ReactModal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)}>
//                     <div>
//                         <button onClick={closeModal} className="close-button">
//                             X
//                         </button>
//                     </div>
//                     <AddEditMenuItemForm
//                         selectedItem={selectedItem}
//                         editMenuItem={editMenuItem}
//                         deleteMenuItem={deleteMenuItem}
//                     />
//                 </ReactModal>
//             )}
        




            
//         </div>

//     );

// }

// export default MenuManager;
import React, { useState, useEffect } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'

import MainMenuCard from '../admin-menu/MainMenuCard';
import ReactModal from 'react-modal';
const MenuManager = () => {

    const [showForm, setShowForm] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default to showing all items

    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Beverages', 'Dessert'];

    const [isOpen, setIsOpen] = useState(false);

    


    useEffect(() => {
        // fetch initial menu items from a server or set sample data here.

        const sampleMenuItems = [
          {
            id: 1,
            name: 'Burger',
            price: '3',
            photo: 'burger.jpg',
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

    const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

    console.log(menuItems)

    const onSelectCategory = (category) => {
        setSelectedCategory(category);

    }

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
        
    };

    const openModalAdd = () => {
        setSelectedItem(null);
        setShowForm(true)
        setIsOpen(true)
    }
    const openModalEdit = (item) => {
        setSelectedItem(item);
        setShowForm(true)
        setIsOpen(true)
    }

    return (
        <div>

            <div className="addEditItemButton">
                <button onClick={openModalAdd}>
                    Add Item +
                </button>

                {showForm && (
                    <ReactModal  isOpen={isOpen} onRequestClose={() => setIsOpen(false) }>
                        <div>
                            <button onClick={closeModal} className="close-button">
                                X
                            </button>
                        </div>
                        <AddEditMenuItemForm
                            selectedItem={selectedItem}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
                            deleteMenuItem={deleteMenuItem}
                            
                        />
                    </ReactModal>


                )}
            </div>


            <div className="menu-list">
                    {menuItems.map((item) => (
                        <MainMenuCard
                            key={item.id}
                            item={item}
                            isOpen={isOpen}
                            onRequestClose={() => setIsOpen(false)}
                            onClick={() => openModalEdit(item)}
                            onCardClick={(item) => setSelectedItem(item)}
                        />
                    ))}
            </div>

            {selectedItem && (
            
                <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                    <div>
                        <button onClick={closeModal} className="close-button">
                            X
                        </button>
                    </div>
                    <AddEditMenuItemForm
                        selectedItem={selectedItem}
                        editMenuItem={editMenuItem}
                        deleteMenuItem={deleteMenuItem}
                    />
                </ReactModal>
            )}
        




            
        </div>

    );

}
export default MenuManager;
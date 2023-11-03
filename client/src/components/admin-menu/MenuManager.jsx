import React, { useState, useEffect } from 'react'
import AddEditMenuItemForm from '../admin-menu/AddEditMenuItemForm'
import AddItemButton from '../admin-menu/AddItemButton';
import ReactModal from 'react-modal';
import ItemModal from '../itemModal';
import ItemCard from '../itemCard';
import FilterBar from '../filterbar';
import AddCategoryTextBox from '../AddCategoryTextBox';
import { IoIosAddCircle } from 'react-icons/io'
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

    // creates inital menu items for testing 
    useEffect(() => {
        // fetch initial menu items from a server or set sample data here.
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            // create a getMenus request when connecting to the server.
            const actionObject = {
                "action": "getMenus",
                "restaurantId": "65381ed4030fa645be95b250"
            };

            // send request
            socket.send(JSON.stringify(actionObject));
        });

        // listen to the server response
        socket.addEventListener('message', function (event) {
            // parse the data
            const menuList = JSON.parse(event.data).menuList;

            //set data into state and set loading state as false
            setMenuItems(menuList.map(item => ({
                id: item.menuId,
                image: item.image,
                itemFilter: item.filter,
                itemName: item.name,
                itemContent: item.description,
                itemPrice: item.price,
                itemDiet: item.diet,
            })));
            setIsLoading(false);
        });

        // when component finished，close WebSocket connection
        return () => {
            socket.close();
        };


        // const sampleMenuItems = [
        //   {
        //     id: 1,
        //     itemName: 'Burger',
        //     itemPrice: '3',
        //     itemFilter: ["Lunch", "Supper"],
        //     image: 'test/burger.png',
        //     itemDiet: ["Spicy", "Vegan"],
        //     itemContent: 'A classic beef burger with lettuce and tomato.',
        //   },
        //   {
        //     id: 2,
        //     itemName: 'Pasta',
        //     itemPrice: '12',
        //     itemFilter: ["Lunch", "Supper"],
        //     image: 'test/pasta.png',
        //     itemDiet: ["Spicy", "Vegan"],
        //     itemContent: 'Delicious pasta with tomato sauce.',
        //   },
        //   {
        //     id: 3,
        //     itemName: 'Thai Noodles',
        //     itemPrice: '15',
        //     itemFilter: ["Lunch", "Supper"],
        //     image: 'test/thai-noodle.png',
        //     itemDiet: ["Spicy", "Vegan"],
        //     itemContent: 'Spicy, sweet, savory, and full of fresh ingredients.',
        //   },

        // ];

        // setMenuItems(sampleMenuItems);
    }, []);




    // for add delete edit actions
    const addMenuItem = (newItem) => {
        // add nem item in database
        // update in database
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            // create a getMenus request when connecting to the server.
            const actionObject = {
                "action": "createMenu",
                "restaurantId": "65381ed4030fa645be95b250",
                "menuId": newItem.itemName,
                "image": newItem.image,
                "filter": [], // havent support
                "name": newItem.itemName,
                "price": newItem.itemPrice,
                "description": newItem.itemContent,
                "diet": [] // havent support
            };
            // send request
            socket.send(JSON.stringify(actionObject));
        });

        // listen to the server response
        socket.addEventListener('message', function (event) {
            // parse the data
            const message = JSON.parse(event.data);
            socket.close();
            if (message.error) {
                console.log(message.error);
            } else {
                // adds the new item to the end of menuItem list 
                setMenuItems([...menuItems, newItem]);
                setShowForm(false);
                setSelectedItem(null);
            }

        });
    };


    const deleteMenuItem = (itemId) => {
        // delete item in database
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            // create a getMenus request when connecting to the server.
            const actionObject = {
                "action": "deleteMenu",
                "restaurantId": "65381ed4030fa645be95b250",
                "menuId": itemId
            };
            // send request
            socket.send(JSON.stringify(actionObject));
        });

        // listen to the server response
        socket.addEventListener('message', function (event) {
            // parse the data
            const message = JSON.parse(event.data);
            socket.close();
            if (message.error) {
                console.log(message.error);
            } else {
                const updatedItems = menuItems.filter((item) => item.id !== itemId);
                setMenuItems(updatedItems);
                setShowForm(false);
                setSelectedItem(null);
            }
        });

    };

    const editMenuItem = (editedItem) => {
        // update in database
        const socket = new WebSocket('ws://localhost:8080');
        socket.addEventListener('open', function (event) {
            // create a getMenus request when connecting to the server.
            const actionObject = {
                "action": "updateMenu",
                "restaurantId": "65381ed4030fa645be95b250",
                "menuId": editedItem.itemName,
                "image": editedItem.image,
                "filter": [], // havent support
                "name": editedItem.itemName,
                "price": editedItem.itemPrice,
                "description": editedItem.itemContent,
                "diet": [] // havent support
            };
            // send request
            socket.send(JSON.stringify(actionObject));
        });

        // listen to the server response
        socket.addEventListener('message', function (event) {
            // parse the data
            const message = JSON.parse(event.data);
            socket.close();
            if (message.error) {
                console.log(message.error);
            } else {
                //checks to see if item exists, then adds to exisitng item, else new item is added
                const updatedItems = menuItems.map((item) => item.id == editedItem.id ? editedItem : item);
                setMenuItems(updatedItems);
                setSelectedItem(null);
                setShowForm(false);
            }

        });

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
        <div>
            <div >

                <h1 className="text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6">Menu</h1>
                <div className="mx-4">
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


            <div className="addEditItemButton flex justify-end p-4">

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
                        <div>
                            <button onClick={closeModal} className="text-xl font-bold">
                                X
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


            <div className="grid grid-cols-5 gap-8">
                <AddItemButton onClick={openModalAdd} />

                {menuItems.map((item) => (
                    <div key={item.id} onClick={() => openModalEdit(item)}>
                        <ItemCard
                            // className=""
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


            {/* {selectedItem && (
                <ItemModal isOpen={isOpen} onClose={closeModal} item={selectedItem} />
            )} */}


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
            )}






        </div>

    )





}
export default MenuManager;
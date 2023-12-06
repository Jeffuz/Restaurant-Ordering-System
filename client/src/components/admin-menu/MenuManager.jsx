import React, { useState, useEffect } from "react";
import AddEditMenuItemForm from "../admin-menu/AddEditMenuItemForm";
import AddItemButton from "../admin-menu/AddItemButton";
import ReactModal from "react-modal";
import ItemModal from "../itemModal";
import ItemCard from "../itemCard";
import FilterBar from "../filterbar";
import AddCategoryTextBox from "../AddCategoryTextBox";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import WebSocketService from "../../WebSocketService";
const MenuManager = () => {
    const [showForm, setShowForm] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);

    //filterbar stuff
    const [filterCategories, setFilterCategories] = useState([
        "All",
        "Breakfast",
        "Lunch",
        "Dinner",
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

    useEffect(() => {
        // Loads the menu items from the menu stored in WebSocketService.menu
        const menuList = WebSocketService.menu;
        console.log("menumanager menu:", menuList);
        if (menuList !== null) {
            setMenuItems(
                menuList.map((item) => ({
                    id: item.menuId,
                    image: item.image,
                    itemFilter: item.filter,
                    itemName: item.name,
                    itemContent: item.description,
                    itemPrice: item.price,
                    itemDiet: item.diet,
                }))
            );
        }

        // This code should thoeretically update the menu whenever a event is dispatched
        // Couldn't figure out how to test it though so it will remain like this for now
        const menuUpdateHandler = () => {
            console.log("Menu Update Received!");
            const menuList = WebSocketService.menu;
            console.log("MenuList: ", menuList);
            setMenuItems(
                menuList.map((item) => ({
                    id: item.menuId,
                    image: item.image,
                    itemFilter: item.filter,
                    itemName: item.name,
                    itemContent: item.description,
                    itemPrice: item.price,
                    itemDiet: item.diet,
                }))
            );
        };

        window.addEventListener("menuUpdate", menuUpdateHandler);
    }, []);

    const addMenuItem = (newItem) => {
        const actionObject = {
            action: "CREATEMENU",
            restaurantId: "6562c6cdc09336bb395262ae",
            menuId: newItem.itemName,
            image: newItem.image,
            filter: [], // havent support
            name: newItem.itemName,
            price: newItem.itemPrice,
            description: newItem.itemContent,
            diet: [], // havent support
            customizable: false, // haven't support in frontend
            custom: [], // haven't support in frontend
        };

        WebSocketService.sendRequest(actionObject);

        // frontend reflect
        setMenuItems([...menuItems, newItem]);
        setShowForm(false);
        setSelectedItem(null);
    };

    const deleteMenuItem = (itemId) => {
        const actionObject = {
            action: "DELETEMENU",
            restaurantId: "6562c6cdc09336bb395262ae",
            menuId: itemId,
        };

        WebSocketService.sendRequest(actionObject);

        // frontend reflect
        const updatedItems = menuItems.filter((item) => item.id !== itemId);
        setMenuItems(updatedItems);
        setShowForm(false);
        setSelectedItem(null);
    };

    const editMenuItem = (editedItem) => {
        const actionObject = {
            action: "EDITMENU",
            restaurantId: "6562c6cdc09336bb395262ae",
            menuId: editedItem.itemName,
            image: editedItem.image,
            filter: [], // havent support
            name: editedItem.itemName,
            price: editedItem.itemPrice,
            description: editedItem.itemContent,
            diet: [], // havent support
            customizable: false, // haven't support in frontend
            custom: [], // haven;t support in frontend
        };

        WebSocketService.sendRequest(actionObject);

        //checks to see if item exists, then adds to exisitng item, else new item is added
        const updatedItems = menuItems.map((item) =>
            item.id == editedItem.id ? editedItem : item
        );
        setMenuItems(updatedItems);
        setSelectedItem(null);
        setShowForm(false);
    };

    // for modal popup editing and adding
    const closeModal = () => {
        setIsOpen(false);
        setShowForm(false);
        setIsFormOpen(false);
    };

    const openModalAdd = () => {
        setSelectedItem(null);
        setShowForm(true);
        setIsOpen(true);
        setIsFormOpen(true);
    };

    const openModalEdit = (item) => {
        console.log("Trying to open the modal for editing:", item);
        setSelectedItem(item);
        setShowForm(true);
        setIsOpen(true);
        setIsFormOpen(true);
    };

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
    };

    const closeEditCategoryMenu = () => {
        setSelectedCategory(null);
        setIsEditCategoryOn(false);
    };

    const onEditCategory = (categoryToEdit) => {
        // Find the index of the category to edit
        const categoryIndex = filterCategories.indexOf(categoryToEdit);

        if (categoryIndex !== -1) {
            const updatedCategoryName = prompt(
                "Edit category name:",
                categoryToEdit
            );

            if (
                updatedCategoryName !== null &&
                updatedCategoryName.trim() !== ""
            ) {
                filterCategories[categoryIndex] = updatedCategoryName;
                setFilterCategories([...filterCategories]);
            }
        }
    };

    const onDeleteCategory = (categoryToDelete) => {
        const updatedCategories = filterCategories.filter(
            (category) => category !== categoryToDelete
        );
        setFilterCategories(updatedCategories);
    };

    const handleAddCategory = (newCategory) => {
        setFilterCategories([...filterCategories, newCategory]);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="mb-8">
                <h1 className="text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6">
                    Menu
                </h1>

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
                    <ReactModal
                        isOpen={isFormOpen}
                        onRequestClose={closeModal}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                            },
                            content: {
                                width: "70%",
                                height: "70%",
                                margin: "auto", // Center the modal horizontally
                                borderRadius: "1rem",
                            },
                        }}
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="text-xl font-bold"
                            >
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

            <div className="overflow-y-auto h-screen">
                <div className="grid grid-cols-5 gap-8 ">
                    <AddItemButton onClick={openModalAdd} />

                    {menuItems.map((item) => (
                        <div key={item.id} onClick={() => openModalEdit(item)}>
                            <ItemCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MenuManager;

import React, { useState } from 'react';
import CategoryOptionsMenu from './FilterOptionsMenu';
import { IoIosAddCircle } from 'react-icons/io'
import AddCategoryTextBox from './AddCategoryTextBox';
const Filterbar = ({ filterCategories, onEdit, onDelete, onAddCategory, isAdmin }) => {
    const [showAddCategoryTextBox, setShowAddCategoryTextBox] = useState(false);

    const handleAddCategory = (newCategory) => {
        onAddCategory(newCategory);
        setShowAddCategoryTextBox(false);
    };


    const filter = [
        {
            id: "1",
            filtered: "Breakfast"
        },
        {
            id: "2",
            filtered: "Lunch"
        },
        {
            id: "3",
            filtered: "Dinner"
        }
    ]

    //edit and delete function

    const [selectedCategory, setSelectedCategory] = useState(null);

    const openEditCategoryMenu = (category) => {
        setSelectedCategory(category);
    };

    const closeEditCategoryMenu = () => {
        setSelectedCategory(null);
    };

    return (
        <div className='flex items-center bg-white rounded-lg py-4 overflow-x-auto '>
            <div className="flex  gap-4 flex-row content-between">
                {isAdmin ? (
                    <ul className='flex gap-28 px-10'>
                        {filterCategories.map((category, index) => (
                            <li key={index}>
                                {/* //{category} */}
                                <div onClick={() => openEditCategoryMenu(category)}>{category}</div>
                                {isAdmin && selectedCategory === category && (
                                    <CategoryOptionsMenu category={category} onEdit={onEdit} onDelete={onDelete} />
                                )}
                                {/* <button onClick={() => openEditCategoryMenu(category)}>HI</button> */}
                            </li>
                        ))}

                    </ul>) :
                    <div>
                        <ul className='flex gap-28 px-10'>
                            {filter.map((option) => (
                                <li key={option.id}>{option.filtered}</li>
                            ))}
                        </ul>
                    </div>
                }

            </div>
            <div className="ml-auto mr-2">
                {isAdmin ? (
                    showAddCategoryTextBox ? (
                        <AddCategoryTextBox onAddCategory={handleAddCategory} />
                    ) : (
                        <button onClick={() => setShowAddCategoryTextBox(true)}>
                            <IoIosAddCircle />
                        </button>
                    )
                ) : null}
            </div>
        </div>
    );
}

export default Filterbar;

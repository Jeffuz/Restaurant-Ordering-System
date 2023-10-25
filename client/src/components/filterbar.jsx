import React ,{useState, useEffect} from 'react';
import CategoryOptionsMenu from './FilterOptionsMenu';
import { IoIosAddCircle } from 'react-icons/io'
import AddCategoryTextBox from './AddCategoryTextBox';
const Filterbar = ({filterCategories, onEdit, onDelete, onAddCategory}) => {
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
        <div className='flex items-center bg-white rounded-lg py-4 overflow-x-auto inline-block mr-4'>
            <div className="flex  gap-4 flex-row content-between">
                <ul className='flex gap-28 px-10'>
                    {filterCategories.map((category, index) => (
                        <li key={index}>
                            {/* //{category} */}
                            <div onClick={() => openEditCategoryMenu(category)}>{category}</div>
                            {selectedCategory === category && (
                                <CategoryOptionsMenu category={category} onEdit={onEdit} onDelete={onDelete} />
                            )}
                         {/* <button onClick={() => openEditCategoryMenu(category)}>HI</button> */}
                        </li>
                    ))}
                </ul>
                
                
            
            </div>
            <div className="ml-auto mr-2"> 
                    {showAddCategoryTextBox ? (
                        <AddCategoryTextBox onAddCategory={handleAddCategory} />
                    ) : (
                        <button onClick={() => setShowAddCategoryTextBox(true)}><IoIosAddCircle /></button>
                    )}
                </div>
        </div>
    );
}

export default Filterbar;

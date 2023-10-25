import React ,{useState, useEffect} from 'react';
import CategoryOptionsMenu from './FilterOptionsMenu';
import { IoIosAddCircle } from 'react-icons/io'
const Filterbar = ({filterCategories, onEdit, onDelete, onAddFilter}) => {
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
        <div className='flex bg-white rounded-lg py-4 overflow-x-auto'>
            <div>
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
                {/* //<button className="add-filter-button" onClick={onAddFilter}>Add Filter</button> */}
            
            </div>
        </div>
    );
}

export default Filterbar;

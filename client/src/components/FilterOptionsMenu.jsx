import React from 'react';
import { RiPencilFill } from 'react-icons/ri'
import {BiSolidTrashAlt} from 'react-icons/bi'
const CategoryOptionsMenu = ({ category, onEdit, onDelete }) => {
    return (
        <div className="category-menu flex flex-col content-start">
            <button className="flex flex row" onClick={() => onEdit(category)}>
                <RiPencilFill />Edit 
            </button>
            <button className="flex flex row" onClick={() => onDelete(category)}>
                <BiSolidTrashAlt/>Delete 
            </button>
        </div>
    );
};

export default CategoryOptionsMenu;

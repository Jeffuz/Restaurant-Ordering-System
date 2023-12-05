import React, { useState } from 'react';

const AddCategoryTextBox = ({ onAddCategory }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            onAddCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <div className="add-category-text-box">
            <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleAddCategory}>Add</button>
        </div>
    );
};

export default AddCategoryTextBox;

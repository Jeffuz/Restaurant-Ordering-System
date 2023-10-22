import React, { useState } from 'react';

const CategoryNavBar = ({ categories, selectedCategory, onSelectCategory, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      onAddCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className="category-nav-bar flex space-x-14 bg-white w-1286 h-50">
      <button
        className={`p-2 ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={selectedCategory === category ? 'selected' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
      <div className="add-category-form">
        <input
          type="text"
          placeholder="Add Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default CategoryNavBar;

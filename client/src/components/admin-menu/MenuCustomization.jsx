import React, {useState} from 'react';

const MenuCustomization = () => {
    const [customizable, setCustomizable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [optionType, setOptionType] = useState('');
    const [newOption, setNewOption] = useState('');
    const [enableOptions, setEnableOptions] = useState(false);

    const handleCustomizationChange = () => {
        setCustomizable(!customizable);
        if (!customizable) {
            setCategories([]);
            setOptionType('');
            setNewCategory('');
            setNewOption('');
        }
    };
    
    const addCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, {name: newCategory, options:[], optionType: '' }]);
            setNewCategory('');
            setEnableOptions(true);
        }
    };

    const addOption = () => {
        if (newOption.trim() !== '') {
            const updatedCategories = [...categories];
            const currentCategory = updatedCategories[updatedCategories.length - 1];
            currentCategory.options.push(newOption);
            setCategories(updatedCategories);
            setNewOption('');
          }
    }; 

    const handleChangeCategory = (e) => {
        setNewCategory(e.target.value);
    }

    const changeOptionType = (e) => {
        setOptionType(e.target.value);
    }

    const handleChangeOption = (e) => {
        setNewOption(e.target.value);
    }

    return (
        <div>
            <div>
                Allow Customer Customization? 
                <input 
                    type="checkbox" 
                    checked={customizable} 
                    onChange={handleCustomizationChange}
                />
            </div>
        {customizable && (
            <div className="grid grid-rows-none">
                <div>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={handleChangeCategory} 
                        placeholder="Choose a category name"
                    />
                    <button className="bg-gray-400 rounded-md" onClick={addCategory}>Add Category</button>
                </div>
                {enableOptions && (
                    <div className="Options grid-rows-2">
                        Select selection type:
                        <div>
                        <input 
                            type="radio" 
                            value="Single Option Selectable"
                            name="OptionTypeSelection"
                            id="SingleOption"
                            onChange={changeOptionType}
                        />
                        <label htmlFor="SingleOption">Single Option Selectable</label>
                        </div>
                        <div>
                        <input 
                            type="radio" 
                            value="Multiple Options Selectable"
                            name="OptionTypeSelection"
                            id="MultipleOptions"
                            onChange={changeOptionType}
                        />
                        <label htmlFor="MultipleOptions">Multiple Options Selectable</label>
                        </div>
                        <div>
                        <input
                            type="text"
                            value={newOption}
                            onChange={handleChangeOption}
                            placeholder="Input an option"
                        />
                        <button className="bg-gray-400 rounded-md" onClick={addOption}>Add Option</button>
                        </div>
                    </div>
                )}
                {/*<div>
                    <div>Categories:</div>
                        {categories.map((category) =>  (
                            <div>
                            <div>{category.name}</div>
                                {category.options.map((option) => (
                                <div>{category.name}:{option}</div>
                            ))}
                            </div>
                        ))}
                </div>
                {optionType && (
                <div>
                    <div>Selected Option Type:</div>
                    <div>{optionType}</div>
                </div>
                )}*/}

            </div>
        )}
        <div>
            {categories.map((category) => (
                <div>
                <div>{category.name}</div>
                {optionType === 'Single Option Selectable' && (
                    <div>
                    {category.options.map((option) => (
                        <div>
                            <input
                                type="radio"
                                value={option}
                                name={category.name}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                    </div>
                )}
                {optionType === 'Multiple Options Selectable' && (
                    <div>
                    {category.options.map((option) => (
                        <div>
                            <input
                                type="checkbox"
                                value={option}
                                name={category.name}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            ))}
        </div>
        </div>
    );
};
export default MenuCustomization;
import {React, useState}  from 'react'


const AddEditMenuItemForm = ({selectedItem, addMenuItem, editMenuItem} ) =>{

    const [itemData ,setItemData] = useState(selectedItem || {}) // either edit or adding new item

    //sets the item edits in place
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };
    
    //adds item to the menu 
    const handleSubmit = () => {
        if (selectedItem) {
            editMenuItem(itemData);
        } else {
            // add id to the new item 
            itemData.id = Date.now();
            addMenuItem(itemData);
        }
    };

    // const handleDelete = () => {
    //     if (selectedItem) {
    //       deleteMenuItem(selectedItem.id);
    //     }
    // };

    return (
        <div className="itemCardContainer">
            <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={itemData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                value={itemData.photo}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={itemData.description}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>
                {selectedItem ? 'Save Changes' : 'Add Item'}
            </button>


            {/* {selectedItem && (
                <button className="delete-button" onClick={handleDelete}>
                    Delete Item
                </button>
            )} */}

        </div>




    )
    


}

export default AddEditMenuItemForm
import React from 'react'

const ItemCard = ({ image, itemName, itemPrice }) => {
    return (
        <div className=''>
            <img src={image} alt={itemName} />
            <div className=''>
                <div>{itemName}</div>
                <div>${itemPrice}</div>
            </div>
        </div>
    )
}

export default ItemCard
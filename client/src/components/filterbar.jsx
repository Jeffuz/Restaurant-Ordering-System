import React from 'react';

const Filterbar = () => {
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

    return (
        <div className='flex bg-white rounded-lg py-4 overflow-x-auto'>
            <div>
                <ul className='flex gap-28 px-10'>
                    {filter.map((option) => (
                        <li key={option.id}>{option.filtered}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filterbar;

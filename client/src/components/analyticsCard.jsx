import React from 'react';

const AnalyticsCard = ({description, icon, stat}) => {

    return (
        <div className="flex flex-col bg-white items-center justify-center rounded-2xl m-4 p-2 text-center">
            <p className="text-gray-500 text-sm mb-1">{description}</p>
            
            <div className="flex flex-row items-center justify-center p-6">
                <div className="xl:text-5xl flex items-center justify-center mr-2">{icon}</div>
                
                <p className="xl:text-5xl">{stat}</p>
            </div>

                    
        </div>

    )
}

export default AnalyticsCard;
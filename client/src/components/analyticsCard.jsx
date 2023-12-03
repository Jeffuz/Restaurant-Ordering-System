import React from 'react';

const AnalyticsCard = ({description, icon, stat}) => {

    return (
        <div className="flex flex-col bg-white items-center justify-content rounded-3xl m-4 p-2 text-center">
            <p className="text-gray-500 text-sm mb-1">{description}</p>
            
            <div className="flex flex-row items-center justify-center p-6">
                <div className="mr-2 xl:text-5xl">{icon}</div>
                
                <p className="xl:text-5xl">{stat}</p>
            </div>

                    
        </div>

    )
}

export default AnalyticsCard;
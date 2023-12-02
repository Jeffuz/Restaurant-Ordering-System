import React from 'react'


const DashInfoCard = ({description, icon, stats}) => {

    return(

        <div className="flex flex-col bg-white items-center justify-center rounded-3xl m-4 p-2">
            <p className="text-gray-500 text-sm mb-1">{description}</p>
            
            <div className="flex flex-row items-center justify-center">
                <div className="mr-2 text-2xl">{icon}</div>
                
                <p className="text-2xl">{stats}</p>
            </div>

            
        </div>

    );
}

export default DashInfoCard;
import React from 'react'


const DashInfoCard = ({description, icon, stats}) => {

    return(

        <div>
           <div className="flex flex-col bg-white items-center justify-content rounded-3xl">
                <p>{description}</p>
                <div className="flex flex-row items-center justify-content">
                    <div className="mr-2">{icon}</div>
                    <p>{stats}</p>
                </div>
                
           </div>
        </div>

    );
}

export default DashInfoCard;
import React, {useState} from 'react';
import Orders from './orderManager.jsx'
import DashInfoCard from './dashboardInfoCard';
import { FaTag } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
const Dashboard = () => {

    const [sales, setSales] = useState(0);
    const [orders, setOrders] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [rating, setRatings] = useState(4);

    return(
        <div className="flex flex-col ">
            <div clasName="analytics mb-4">
                {/* create four analytics 
                display in row 
                create analytic component 
                    passes in icon and the data and also the description */}
                <div className="grid grid-cols-4 gap-2">
                    <DashInfoCard description="Total Sales" icon={<FaTag />} stats={sales}/>
                    <DashInfoCard description="Orders Processed" icon={<BsArrowRepeat />} stats={orders}/>
                    <DashInfoCard description="Open Orders" icon={<FcOk />} stats={processed}/>
                    <DashInfoCard description="Customer Rating" icon={<FaStar />} stats={rating}/>
        

                </div>
            </div>
            <Orders />
        </div>
    )
}

export default Dashboard; 

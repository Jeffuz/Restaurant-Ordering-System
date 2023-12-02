import React, {useState} from 'react';
import Orders from './orderManager.jsx'
import DashInfoCard from './dashboardInfoCard';
import { FaTag } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";

const Dashboard = () => {

    const [sales, setSales] = useState(172845);
    const [orders, setOrders] = useState(5);
    const [processed, setProcessed] = useState(53);
    const [rating, setRatings] = useState(4);
    const [tablesAvailable, setTablesAvailable] = useState(8);

    return(
        <div className="flex flex-col ">
            <div className="p-4 overflow-x-auto  ">
                
                <div className="grid grid-cols-4 space-4">
                    <DashInfoCard description="Total Sales" icon={<FaTag />} stats={sales}/>
                    <DashInfoCard description="Orders Processed" icon={<BsArrowRepeat />} stats={orders}/>
                    <DashInfoCard description="Open Orders" icon={<FcOk />} stats={processed}/>
                    <DashInfoCard description="Customer Rating" icon={<FaStar />} stats={rating}/>
                    {/* <DashInfoCard description="Tables Available" icon={<MdTableRestaurant />} stats={tablesAvailable}/> */}
                    
        

                </div>
            </div>
            <Orders className="mt-8 mb-8" />
        </div>
    )
}

export default Dashboard; 

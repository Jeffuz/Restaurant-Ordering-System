import React, {useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = () => {

    const [totalSales, setTotalSales] = useState(175000);
    const [orderHistory, setOrderHistory] = useState([
        {
            _id: '1',
            menuItemId: 'menu-item-1',
            quantity: 2,
            custom: ['extra-cheese'],
            price: 20,
            createdAt: '2023-01-01T12:30:00.000Z',
        },
        {
            _id: '2',
            menuItemId: 'menu-item-3',
            quantity: 1,
            custom: ['no-onions'],
            price: 15,
            createdAt: '2023-01-02T18:45:00.000Z',
        },
        {
            _id: '3',
            menuItemId: 'menu-item-2',
            quantity: 3,
            custom: ['spicy-sauce', 'extra-veggies'],
            price: 30,
            createdAt: '2023-01-03T15:20:00.000Z',
        },
    ]);

    //get total orders
    const totalOrders = orderHistory.length;


    return (

        <div>

            {/* show total orders  */}
            <div className="flex flex-col bg-white items-center justify-center rounded-3xl m-4 p-2">
                <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                
                <div className="flex flex-row items-center justify-center">
                    <div className="mr-2 text-2xl"> hi</div>
                    
                    <p className="text-2xl">{totalOrders}</p>
                </div>

            {/* show total sales price  */}  
            {/* show total guest served, get from table schema and check seats occuiped and count seats avail  */}
            {/* show avg custoemr spending, get thorugh tables items, check orderItems and count price and quantity  */}
            {/* figure out filter?  */}
            </div>
            <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
                <Line type="monotone" dataKey="guestsServed" stroke="#82ca9d" />
                <Line type="monotone" dataKey="averageSpending" stroke="#ffc658" />
            </LineChart>
        </div>
        
    );
};

export default Analytics;

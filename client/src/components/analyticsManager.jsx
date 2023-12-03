import React, { useState } from 'react';

//import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis} from 'recharts';
import AnalyticsCard from './analyticsCard'
import { MdFastfood } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
const Analytics = () => {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4D4F', '#36CFC9'];

  // const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');

  // const handleTimePeriodChange = (newTimePeriod) => {
  //   setSelectedTimePeriod(newTimePeriod);
  // };

  
  //mock data for fake restaurant containing menu , tables, and history

  
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: 'Your Restaurant',
    restaurantMenu: {
      totalItemCount: 2,
      menuList: [
        {
          menuId: '1',
          image: 'menu-item-1.jpg',
          filter: ['filter1', 'filter2'],
          name: 'Menu Item 1',
          price: 10,
          description: 'Description for Menu Item 1',
          diet: ['vegan'],
          customizable: true,
          custom: [
            {
              name: 'Custom Option 1',
              multipleSelection: true,
              option: [
                { customName: 'Option A', price: 2 },
                { customName: 'Option B', price: 3 },
              ],
            },
          ],
        },
        {
          menuId: '2',
          image: 'menu-item-2.jpg',
          filter: ['filter1', 'filter3'],
          name: 'Menu Item 2',
          price: 15,
          description: 'Description for Menu Item 2',
          diet: ['vegetarian'],
          customizable: false,
          custom: [],
        },
        {
          menuId: '3',
          image: 'menu-item-3.jpg',
          filter: ['filter1', 'filter3'],
          name: 'Menu Item 3',
          price: 15,
          description: 'Description for Menu Item 3',
          diet: ['vegan'],
          customizable: false,
          custom: [],
        },
      ],
    },
    table: {
      totalTableCount: 5,
      tableList: [
        {
          seatCapacity: 4,
          isOccupied: false,
          order: [],
        },
        
      ],
    },
    history: [
      {
        userId: 'user1',
        userHistory: [
          {
            menuItemId: '1',
            quantity: 2,
            custom: [],
            price: 20,
            createdAt: new Date('2023-01-02T18:45:00'), 
          },
          {
            menuItemId: '2',
            quantity: 1,
            custom: ['extra cheese'],
            price: 15,
            createdAt: new Date('2023-01-02T18:45:00'),
          },
        ],
      },
      {
        userId: 'user2',
        userHistory: [
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-12-12T18:45:00'), 
          },
          {
            menuItemId: '3',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-12-12T18:45:00'), 
          },
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user3',
        userHistory: [
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T12:45:00'), 
          },
          {
            menuItemId: '3',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T12:45:00'), 
          },
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user4',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user5',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T14:45:00'), 
          },
          // Add more order histories as needed
        ],
      },
      {
        userId: 'use6',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-02T10:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T10:45:00'), 
          },
          {
            menuItemId: '3',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T10:45:00'), 
          },
        
          // Add more order histories as needed
        ],
      },

      {
        userId: 'user7',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-02T13:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T13:45:00'), 
          },
   
       
          // Add more order histories as needed
        ],
      },
      
      {
        userId: 'user9',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-02T13:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T13:45:00'), 
          },
   
       
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user10',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-02T13:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-02T13:45:00'), 
          },
   
       
          // Add more order histories as needed
        ],
      },
      // Add more user data as needed
    ],
  });


  if (!restaurantData) {
   
    return <p>Loading...</p>;
  }
  //total orders across all users
  const calculateTotalOrders = () => {
    if (!restaurantData || !restaurantData.history) {
      return 0;
    }

    return restaurantData.history.reduce(
      (total, history) => total + (history.userHistory ? history.userHistory.length : 0),
      0
    );
  };

  const calculateTotalSales = () => {
    if (!restaurantData || !restaurantData.history) {
      return 0;
    }

    return restaurantData.history.reduce((totalSales, history) => {
      if (history.userHistory) {
        history.userHistory.forEach(order => {
          totalSales += order.price || 0;
        });
      }
      return totalSales;
    }, 0);

  }

  

  const calculateMenuItemCounts = () => {
    if (!restaurantData || !restaurantData.history) {
      return [];
    }

    //keep count in dictionary here of all items 
    const itemCounts = {};

    restaurantData.history.forEach((history) => {
      if (history.userHistory) {
        history.userHistory.forEach((order) => {
          const menuItemId = order.menuItemId;
          itemCounts[menuItemId] = (itemCounts[menuItemId] || 0) + 1;
        });
      }
    });

    // turn the itemCounts object to an array 
    return Object.keys(itemCounts).map((menuItemId) => ({
      menuItemId,
      count: itemCounts[menuItemId],
    }));
  };

  const calculatePopularTimes = () => {
    if (!restaurantData || !restaurantData.history) {
      return [];
    }
  
    const userCounts = {};
  
    restaurantData.history.forEach((history) => {
      if (history.userHistory) {
        history.userHistory.forEach((order) => {
          if (order.createdAt) {
            const hour = new Date(order.createdAt).getHours();
            const timeKey = `${hour}:00`; 
  
            if (!userCounts[timeKey]) {
              userCounts[timeKey] = new Set();
            }
  
            userCounts[timeKey].add(history.userId);
          }
        });
      }
    });
  
    // Convert the userCounts object to an array of objects
    return Object.keys(userCounts).map((timeKey) => ({
      hour: timeKey,
      count: userCounts[timeKey].size,
    }));

  };

  const calculateTotalCustomers = () => {
    if (!restaurantData || !restaurantData.history) {
      return 0;
    }

    
    const uniqueUserIds = new Set();

    restaurantData.history.forEach((history) => {
      if (history.userId) {
        uniqueUserIds.add(history.userId);
      }
    });

    return uniqueUserIds.size;
  };

  //for popular items 
  const menuItemCounts = calculateMenuItemCounts();

  const totalOrders = calculateTotalOrders();

  const totalSales = calculateTotalSales();

  const totalCustomers = calculateTotalCustomers();

  const avgCustomerSpending = totalCustomers > 0 ? (totalSales / totalCustomers).toFixed(2) : 0;

  const popularTimesData = calculatePopularTimes();
  const sortedPopularTimesData = popularTimesData.sort((a, b) => b.count - a.count);

  return (
    <div>


      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-content">

            <div className="grid grid-cols-2 space-4">
              <AnalyticsCard description='Total Orders' icon={<MdFastfood />} stat={totalOrders}/>
              <AnalyticsCard description='Total Sales' icon={<MdAttachMoney />} stat={totalSales}/>
              <AnalyticsCard description='Total Users' icon={<MdPeopleAlt />} stat={totalCustomers}/>
              <AnalyticsCard description='Average Customer Spending' icon={<FaMoneyBillWave />} stat={avgCustomerSpending}/>


            </div>



            <div className="grid grid-cols-2 space-4">
              <div className="bg-white rounded-3xl m-4 p-2 flex flex-col items-center justify-content">
                <p className="text-2xl">Popular menu items</p>
                <PieChart  width={400} height={400} className="mx-auto">
                  <Pie
                    data={menuItemCounts}
                    dataKey="count"
                    nameKey="menuItemId"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {menuItemCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={({ payload }) => <div>Total: {payload[0]?.payload.menuItemId}</div>} />
                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>

        

          <div className="bg-white rounded-3xl m-4 p-2 flex flex-col items-center justify-between">
                <p className="text-2xl">Most to Least Popular Times</p>
                <BarChart width={400} height={300} data={sortedPopularTimesData}>
                  <XAxis dataKey="hour" 
                        tickFormatter={(value) => {
                          const originalHour = parseInt(value, 10);
                          const formattedHour = originalHour % 12 || 12; // Convert to 12-hour format
                          const ampm = originalHour >= 12 ? 'PM' : 'AM';
                          return `${formattedHour} ${ampm}`;
                        }}
                  />
                  <Bar dataKey="count" fill={COLORS[0]} />
                </BarChart>

          </div>

        </div>
      
        
    </div>
  );

};

export default Analytics;

import React, { useState } from 'react';
import { IoMdRestaurant } from "react-icons/io";
//import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis} from 'recharts';
import AnalyticsCard from './analyticsCard'
import { MdFastfood } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbArrowZigZag } from "react-icons/tb";
const Analytics = () => {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4D4F', '#36CFC9'];

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
      {
        userId: 'user11',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-01-03T20:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-01-03T20:45:00'), 
          },
   
       
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user12',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-05-03T11:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-05-03T11:45:00'), 
          },
   
       
          // Add more order histories as needed
        ],
      },
      {
        userId: 'user13',
        userHistory: [
          {
            menuItemId: '2',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2021-05-03T09:45:00'), 
          },
          {
            menuItemId: '1',
            quantity: 3,
            custom: ['extra sauce'],
            price: 30,
            createdAt: new Date('2023-05-03T09:45:00'), 
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

  // get count of all item order price
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

  

  //get the count of each menu item to display on pie chart to visualize most popular items
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
          const menuItem = restaurantData.restaurantMenu.menuList.find((item) => item.menuId === menuItemId);
  
          if (menuItem) {
            const menuItemName = menuItem.name;
            itemCounts[menuItemId] = {
              count: (itemCounts[menuItemId]?.count || 0) + 1,
              name: menuItemName,
            };
          }
        });
      }
    });
  
    // Turn the itemCounts object to an array
    return Object.keys(itemCounts).map((menuItemId) => ({
      menuItemId,
      name: itemCounts[menuItemId].name,
      count: itemCounts[menuItemId].count,
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

  
  //get the min and max range of menu item price
  const calculatePriceRange = (menuList) => {
    if (!menuList || menuList.length === 0) {
      return null; 
    }
  
  
    const prices = menuList.map(item => item.price);
  
    // Find the minimum and maximum prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
  
    
    return { minPrice, maxPrice };
  };

  const priceRange = calculatePriceRange(restaurantData.restaurantMenu.menuList);


  //for popular items 
  const menuItemCounts = calculateMenuItemCounts();

  //count the orders
  const totalOrders = calculateTotalOrders();

  //total revenue from items only
  const totalSales = calculateTotalSales().toLocaleString();

  //count users from history 
  const totalCustomers = calculateTotalCustomers();

  //get avg spending of custoemr total
  const avgCustomerSpending = totalCustomers > 0 ? (totalSales / totalCustomers).toFixed(2) : 0;

  //get times that people come in on based on order time
  const popularTimesData = calculatePopularTimes();
  const sortedPopularTimesData = popularTimesData.sort((a, b) => b.count - a.count);

  return (
    <div className=" mb-10 mr-10 ml-10">


      <div className="flex flex-col">
        <div className="flex flex-row items-center ">
          <div className="bg-white rounded-2xl m-8 p-4 flex flex-col pl-8 pr-8 mx-auto" style={{ width: '350px', height: '350px' }}>
            <div className="flex flex-row items-center justify-content">
              <IoMdRestaurant className="text-5xl mr-2"/>
              <p className="text-3xl text-black-500 mt-4 mb-4 text-center">{restaurantData.restaurantName}</p>

            </div>
            
            <div className="text-xl text-gray-500 mt-4 mb-4 text-left flex flex-row items-center justify-content">
             <div className="text-5xl text-black mr-2">
                {restaurantData.table.totalTableCount}
              </div>
              tables
              
            </div>
            <div className="text-xl text-gray-500 mt-4 mb-4 text-left flex flex-row items-center justify-content">
             <div className="text-5xl text-black mr-2">
                {restaurantData.restaurantMenu.totalItemCount}
              </div>
              items on menu
              
            </div>
            <div className="text-xl text-gray-500 mt-4 mb-4 text-left flex flex-row items-center justify-content">
             <div className="text-3xl text-black mr-2">
                {priceRange && `$${priceRange.minPrice}-${priceRange.maxPrice}`}
              </div>
              menu price range 
              
            </div>

          
            
            
        
          </div>

          <div className="flex flex-col">
            <AnalyticsCard description='Total Orders' icon={<MdFastfood />} stat={totalOrders}/>
            <AnalyticsCard description='Total Revenue' icon={<FiDollarSign />} stat={totalSales}/>
            

          </div>



           
              <div className="bg-white rounded-2xl m-8 p-2 flex flex-col items-center justify-center mx-auto overflow-auto">
                <p className="text-2xl text-gray-500 mt-4 mb-4">Popular Menu Items</p>
                <PieChart width={550} height={275}  className="mx-auto">
                  <Pie
                    data={menuItemCounts}
                    dataKey="count"
                    nameKey="menuItemId"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    fill="#8884d8"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {menuItemCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => (
                      <div className="bg-white border rounded p-4 shadow-md">
                        <p>{`Menu Item: ${payload[0]?.payload.name}`}</p>
                        <p>{`Total Orders: ${payload[0]?.payload.count}`}</p>
                      </div>
                    )}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ right: 10, top: 0, bottom: 0 }}
                  />
                  
                  
                </PieChart>
              </div>
            </div>
      

        

          <div className="flex flex-row">
            <div className="bg-white rounded-2xl p-2 flex flex-col items-center justify-between overflow-auto">
                  <p className="text-2xl text-gray-500 mt-4 mb-4">Most to Least Popular Times</p>
                  <BarChart width={900} height={300} data={sortedPopularTimesData} >
                    <XAxis dataKey="hour" 
                          tickFormatter={(value) => {
                            const originalHour = parseInt(value, 10);
                            const formattedHour = originalHour % 12 || 12; // Convert to 12-hour format
                            const ampm = originalHour >= 12 ? 'PM' : 'AM';
                            return `${formattedHour} ${ampm}`;
                          }}
                    />
                    <YAxis label={{ value: 'Total Orders', angle: -90, position: 'insideLeft' } }
                    interval={0} // interval to 0
                    allowDecimals={false} />
                    <Bar dataKey="count" fill={COLORS[0]} />
                  </BarChart>

                  

            </div>

            <div className="flex flex-col">
               <AnalyticsCard description='Total Users' icon={<MdPeopleAlt />} stat={totalCustomers}/>
                <AnalyticsCard description='Average Spending' icon={<FiDollarSign />} stat={avgCustomerSpending}/>



            </div>
               


          </div>
          
        </div>
      
        
    </div>
  );

};

export default Analytics;

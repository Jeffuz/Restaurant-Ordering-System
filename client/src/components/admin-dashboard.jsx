import React, {useState, useEffect} from 'react';
import Orders from './orderManager.jsx'
import DashInfoCard from './dashboardInfoCard';
import { FaTag } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";

const Dashboard = () => {

    const [sales, setSales] = useState(172845);
    //for the incomplete/open orders
    const [pending, setPending] = useState(0);
    //for the completed / processed orders;
    const [completed, setCompleted] = useState(0);
    const [rating, setRatings] = useState(4);
    const [tablesAvailable, setTablesAvailable] = useState(8);

    //mock restaurant data for getting user and order history 
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
              order: [ {
                menuItemId: 1,
                quantity: 2,
                custom: [],
                price: 20,
                status: 'completed',

                },
            
                ],
            },
            {
                seatCapacity: 4,
                isOccupied: true,
                order: [ {
                  menuItemId: 1,
                  quantity: 2,
                  custom: [],
                  price: 20,
                  status: 'pending',
  
                  },
              
                  ],
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
              // add user
            ],
          },
          //add more history 
          
        ],
      });

      useEffect(() => {
        // Calculate total processed orders based on restaurantData
        const calculateOrderStats = () => {
          if (!restaurantData || !restaurantData.table || !restaurantData.table.tableList) {
            return;
          }

          let totalCompletedOrder = 0;
          let totalPendingOrder = 0
          restaurantData.table.tableList.forEach(table => {
            if (table.order && table.order.length > 0) {
              totalPendingOrder += table.order.filter(order => order.status === 'pending').length;
              totalCompletedOrder += table.order.filter(order => order.status === 'completed').length;
            }
          });

          setCompleted(totalCompletedOrder);
          setPending(totalPendingOrder);

        };
    
  
        calculateOrderStats();
      }, [restaurantData]);

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

     

      const totalSales = calculateTotalSales().toLocaleString();
    
    
        
    return(
        <div className="flex flex-col ">
            <div className="p-4 overflow-x-auto  ">
                
                <div className="grid grid-cols-4 space-4">
                    <DashInfoCard description="Total Sales" icon={<FaTag />} stats={totalSales}/>
                    <DashInfoCard description="Orders Processed" icon={<BsArrowRepeat />} stats={completed}/>
                    <DashInfoCard description="Open Orders" icon={<FcOk />} stats={pending}/>
                    <DashInfoCard description="Customer Rating" icon={<FaStar />} stats={rating}/>
                    {/* <DashInfoCard description="Tables Available" icon={<MdTableRestaurant />} stats={tablesAvailable}/> */}
                    
        

                </div>
            </div>
            <Orders className="mt-8 mb-8" />
        </div>
    )
}

export default Dashboard; 

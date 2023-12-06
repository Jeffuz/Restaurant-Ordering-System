import React, { useState, useEffect } from 'react'
import AdminNavbar from '../components/adminNavbar'
import OrderManager from '../components/orderManager'
import AdminOrderStatusCard from '../components/adminOrderStatusCard';

const Admin_orders = (props) => {

    const { WebSocketService, setPage } = props;

    // waitingOrders formatted as [hash: int, clientId: string, item: object, time: string]
    const [waitingOrders, setWaitingOrders] = useState(WebSocketService.waitingOrders);
    const [workingOrders, setWorkingOrders] = useState(WebSocketService.workingOrders);
    const [finishedOrders, setFinishedOrders] = useState(WebSocketService.finishedOrders);

    const enqueueItem = (item) => {
        // Remove item from waiting orders
        // Rerender that

        // push item to working orders
        // rerender working orders
        setWaitingOrders([]);
        setWorkingOrders([...workingOrders, item]);
    }

    useEffect(() => {
        // Function invoked when WebSocketService receives a order update

        const orderUpdateHandler = (orders) => {
            
            
            setWaitingOrders(orders.detail.waitingOrders);
            setWorkingOrders(orders.detail.workingOrders);
            setFinishedOrders(orders.detail.finishedOrders);
        }
        WebSocketService.requestOrders();
        window.addEventListener('orderUpdate', orderUpdateHandler);
    }, [WebSocketService, WebSocketService.finishedOrders, WebSocketService.waitingOrders, WebSocketService.workingOrders, waitingOrders]);

    const workOnItem = (item) => {
        WebSocketService.workOnItem(item);
    }

    const finishItem = (item) => {
        WebSocketService.finishItem(item);
    }

    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar setPage={setPage} /></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col h-screen'>
                        <div className='text-center h-[10%] text-black font-Montserrat text-4xl font-bold py-6 '>Orders</div>
                        <div className='px-6 pb-6 h-[90%]'>
                            <div className='flex flex-row gap-6 h-full'>
                                <div className='flex flex-col w-full bg-white rounded-2xl'>
                                    <div className='flex justify-center p-3 leading-10 font-bold text-2xl'>Order's Waiting</div>
                                    <div className='flex flex-col overflow-y-auto'>
                                        {waitingOrders.map((waitingOrder) => (
                                            <button onClick={() => workOnItem(waitingOrder)} className='mx-5'>
                                                {/* client: {waitingOrder.orderer} <br />
                                                Order id: {waitingOrder.hash} <br />
                                                Order: {waitingOrder.item.id} */}
                                                <AdminOrderStatusCard
                                                    itemName={waitingOrder.item.itemName}
                                                    itemImage={waitingOrder.item.image}
                                                    orderId={waitingOrder.hash}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col w-full bg-white rounded-2xl'>
                                    <div className='flex justify-center p-3 leading-10 font-bold text-2xl'>
                                        Working Order's
                                    </div>
                                    <div className='flex flex-col overflow-y-auto'>
                                        {workingOrders.map((workingOrder) => (
                                            <button onClick={() => finishItem(workingOrder)} className='mx-5'>
                                                <AdminOrderStatusCard
                                                    itemName={workingOrder.item.itemName}
                                                    itemImage={workingOrder.item.image}
                                                    orderId={workingOrder.hash}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col w-full bg-white rounded-2xl'>
                                    <div className='flex justify-center p-3 leading-10 font-bold text-2xl'>Finished Order's</div>
                                    <div className='flex flex-col overflow-y-auto'>
                                        {finishedOrders.map((finishedOrder) => (
                                            <button className='mx-5'>
                                                <AdminOrderStatusCard
                                                    itemName={finishedOrder.item.itemName}
                                                    itemImage={finishedOrder.item.image}
                                                    orderId={finishedOrder.hash}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <OrderManager waitingOrders={waitingOrders} workingOrders={workingOrders} finishedOrders={finishedOrders} pq={printQueue}/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_orders
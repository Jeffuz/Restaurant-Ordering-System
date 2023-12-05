import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/adminNavbar'
import OrderManager from '../components/orderManager'

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
            console.log('adminOrders.js received order update!');
            console.log('orders:', orders.detail);
            setWaitingOrders(orders.detail.waitingOrders);
            setWorkingOrders(orders.detail.workingOrders);
            setFinishedOrders(orders.detail.finishedOrders);
        }
        WebSocketService.requestOrders();
        window.addEventListener('orderUpdate', orderUpdateHandler);
    }, [WebSocketService, WebSocketService.finishedOrders, WebSocketService.waitingOrders, WebSocketService.workingOrders, waitingOrders]);

    const printQueue = () => {
        console.log('printing queue');
        console.log(waitingOrders);
        console.log(workingOrders);
        console.log(finishedOrders);
    }
    
    const workOnItem = (item) => {
        WebSocketService.workOnItem(item);
    }

    const finishItem = (item) => {
        WebSocketService.finishItem(item);
    }

    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar setPage={setPage}/></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col h-screen'>
                        <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6 '>Orders</div>
                        <div className='flex flex-row border-black'>
                            <div className='flex flex-col'>
                                Waiting Order
                                {waitingOrders.map((waitingOrder) => (
                                    <button onClick={() => workOnItem(waitingOrder)}>
                                        client: {waitingOrder.orderer} <br />
                                        Order id: {waitingOrder.hash} <br /> 
                                        Order: {waitingOrder.item.id}
                                    </button>
                                ))} 
                            </div>
                            <div className='flex flex-col'>
                                Working Order
                                {workingOrders.map((workingOrder) => (
                                    <button onClick={() => finishItem(workingOrder)}>
                                        client: {workingOrder.orderer} <br />
                                        Order id: {workingOrder.hash} <br /> 
                                        Order: {workingOrder.item.id} <br />
                                        <br />
                                    </button>
                                ))}
                            </div>
                            <div className='flex flex-col'>
                                Finished orders:
                                {finishedOrders.map((finishedOrder) => (
                                    <div>
                                        client: {finishedOrder.orderer} <br />
                                        Order id: {finishedOrder.hash} <br /> 
                                        Order: {finishedOrder.item.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <OrderManager waitingOrders={waitingOrders} workingOrders={workingOrders} finishedOrders={finishedOrders} pq={printQueue}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_orders
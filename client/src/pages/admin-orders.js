import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/adminNavbar'
const Admin_orders = () => {

    const [orders, setOrders] = useState([
        'a',
        'b',
        'c'
    ]);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function test(){
        for(let i = 0; i < 5; i++){
            await sleep(1000);
            setOrders(prevOrders => [...prevOrders, `hello${i}`]);
        }
    }   

    useEffect(() => {
        test();
    }, []);

    return (
        <>
            <div className="flex flex-row">
                <div className='w-[20%]'><AdminNavbar /></div>
                <div className="w-[80%] h-screen">
                    <div className='flex flex-col'>
                        <div className='text-center mt-27 text-black font-Montserrat text-4xl font-bold py-6'>Orders</div>
                        <div>{/* Component */}</div>
                        <div>
                            {orders.map((order, index) => (
                                <div>{order}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_orders
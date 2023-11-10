const AdminOrderStatusCard = ({ item }) => {
    return (
        <div className='bg-gray-100 p-4 mb-4 flex items-center justify-between rounded-lg shadow-md'>
            <img src={item.itemImage} alt={item.itemName} className='h-16 object-cover' />
            <div className="flex flex-col">
                <div className='font-bold'>{item.itemName}</div>
                <div>Order Number: {item.itemOrderNum}</div>
                <div>Item Count: {item.itemCount}</div>
            </div>
            <div>{item.itemStatus}</div>
        </div>
    );
};

export default AdminOrderStatusCard;
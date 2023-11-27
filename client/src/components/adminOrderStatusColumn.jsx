import React, { useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AdminOrderStatusCard from './adminOrderStatusCard';

const AdminOrderStatusColumn = ({ column, tasks }) => {
    useEffect(() => {
    }, [tasks]);

    return (
        <Droppable droppableId={column.id}>
            {(droppableProvided) => (
                <div
                    className='bg-white rounded-md'
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                >
                    <div className='p-5 font-bold text-3xl'>{column.title}</div>
                    {tasks.map((task, index) => (
                        <Draggable key={`${task.id}-${task.item.itemStatus}`} draggableId={`${task.id}`} index={index}>
                            {(draggableProvided) => (
                                <div
                                    key={`${task.id}-${task.item.itemStatus}`}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}
                                >
                                    <div className='mx-5'>
                                        <AdminOrderStatusCard item={task.item} />
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default AdminOrderStatusColumn;

import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const AdminOrderStatusColumn = ({ column, tasks }) => {
    return (
        <>
            <Droppable droppableId={column.id}>
                {(droppableProvided) => (
                    <div className='bg-white rounded-md'
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        <div className='p-5 font-bold text-3xl'>{column.title}</div>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                {(draggableProvided) => (
                                    <div className='flex justify-center bg-gray-100 m-6 p-6'
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <div>{task.content}</div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </>
    )
}

export default AdminOrderStatusColumn
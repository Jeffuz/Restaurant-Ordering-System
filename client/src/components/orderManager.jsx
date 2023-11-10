import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import AdminOrderStatusColumn from './adminOrderStatusColumn'

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    };

    return newColumn;
}
const OrderManager = () => {
    const [state, setState] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        // Check if user tries to drop in a unknown destuination
        if (!destination) {
            return;
        }
        // Check if users drops in the same desitination as current position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Check if user drops within the same column but in a different position
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            )

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                },
            }
            setState(newState);
            return;
        }

        // Check if user moves to a different column
    }
    return ( 
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='grid grid-cols-3 h-full gap-8 mx-8 mb-8'>
                    {state.columnOrder.map((columnId) => {
                        const column = state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                        return <AdminOrderStatusColumn key={column.id} column={column} tasks={tasks} />
                    })}
                </div>
            </DragDropContext>
        </>
    )
}

export default OrderManager


const initialData = {
    tasks: {
        1: { id: 1, content: "Jeff" },
        2: { id: 2, content: "Andrew" },
        3: { id: 3, content: "Louis" },
        4: { id: 4, content: "Eunice" },
        5: { id: 5, content: "Ipsita" },
        6: { id: 6, content: "Charith" },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "TO-DO",
            taskIds: [1, 2, 3, 4, 5, 6],
        },
        "column-2": {
            id: "column-2",
            title: "IN-PROGRESS",
            taskIds: [],
        },
        "column-3": {
            id: "column-3",
            title: "COMPLETED",
            taskIds: [],
        },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
};
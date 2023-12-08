import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AdminOrderStatusColumn from "./adminOrderStatusColumn";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const initializeTasks = () => {
  return {
    1: {
      id: 1,
      item: {
        itemImage: "test/nacho-chips.png",
        itemName: "Nacho chips",
        itemOrderNum: "69",
        itemCount: 5,
        itemStatus: "processing",
      },
    },
    2: {
      id: 2,
      item: {
        itemImage: "test/nacho-chips.png",
        itemName: "Nacho chips",
        itemOrderNum: "69",
        itemCount: 5,
        itemStatus: "pending",
      },
    },
    3: {
      id: 3,
      item: {
        itemImage: "test/nacho-chips.png",
        itemName: "Nacho chips",
        itemOrderNum: "70",
        itemCount: 6,
        itemStatus: "pending",
      },
    },
    4: {
      id: 4,
      item: {
        itemImage: "test/nacho-chips.png",
        itemName: "Nacho chips",
        itemOrderNum: "70",
        itemCount: 6,
        itemStatus: "completed",
      },
    },
  };
};

const initializeColumns = () => {
  return {
    "column-1": {
      id: "column-1",
      title: "Order's Pending",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Order's Processing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Order Complete",
      taskIds: [],
    },
  };
};

const OrderManager = ({ pq }) => {
  const [state, setState] = useState({
    tasks: initializeTasks(),
    columns: initializeColumns(),
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  const updateColumns = () => {
    const updatedColumns = {
      "column-1": { ...state.columns["column-1"], taskIds: [] },
      "column-2": { ...state.columns["column-2"], taskIds: [] },
      "column-3": { ...state.columns["column-3"], taskIds: [] },
    };

    Object.values(state.tasks).forEach((task) => {
      const columnIndex = getColumnIndex(task.item.itemStatus);
      updatedColumns[`column-${columnIndex}`].taskIds.push(task.id);
    });

    setState((prevState) => ({
      ...prevState,
      columns: updatedColumns,
    }));
  };

  useEffect(() => {
    updateColumns();
  }, [state.tasks]);

  const updateItemStatus = (taskId, newStatus) => {
    setState((prevState) => {
      const updatedTasks = {
        ...prevState.tasks,
        [taskId]: {
          ...prevState.tasks[taskId],
          item: {
            ...prevState.tasks[taskId].item,
            itemStatus: newStatus,
          },
        },
      };

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
    updateColumns();
  };

  const onDragEnd = (result) => {
    pq();
    const { destination, source } = result;

    // Check if user tries to drop in an unknown destination
    if (!destination) {
      return;
    }

    // Check if users drops in the same destination as the current position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Check if user drops within the same column but in a different position
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    // Check if user drops within the same column but in a different position
    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      setState((prevState) => {
        const newState = {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };

        updateColumns(newState);

        const movedTaskId = newColumn.taskIds[destination.index];
        updateItemStatus(movedTaskId, getColumnStatus(destinationCol.id));

        return newState;
      });

      return;
    }

    // Check if user moves to a different column
    if (sourceCol.id !== destinationCol.id) {
      const startTaskIds = Array.from(sourceCol.taskIds);
      const [removed] = startTaskIds.splice(source.index, 1);
      const newStartCol = {
        ...sourceCol,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(destinationCol.taskIds);
      endTaskIds.splice(destination.index, 0, removed);
      const newEndCol = {
        ...destinationCol,
        taskIds: endTaskIds,
      };

      setState((prevState) => {
        const newState = {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol,
          },
        };

        // Update itemStatus when moving to a different column
        const movedTaskId = newEndCol.taskIds[destination.index];
        const newStatus = getColumnStatus(destinationCol.id);

        // Call the functions after the state has been updated
        updateItemStatus(movedTaskId, newStatus);
        updateColumns(newState);

        return newState;
      });
    }
  };

  const getColumnIndex = (itemStatus) => {
    switch (itemStatus) {
      case "pending":
        return 1;
      case "processing":
        return 2;
      case "completed":
        return 3;
      default:
        return 1; // Default to order pending
    }
  };

  const getColumnStatus = (columnId) => {
    switch (columnId) {
      case "column-1":
        return "pending";
      case "column-2":
        return "processing";
      case "column-3":
        return "completed";
      default:
        return "pending"; // Default to order pending
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 h-full gap-8 mx-8 mb-8">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return (
              <AdminOrderStatusColumn
                key={column.id}
                column={column}
                tasks={tasks}
              />
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default OrderManager;
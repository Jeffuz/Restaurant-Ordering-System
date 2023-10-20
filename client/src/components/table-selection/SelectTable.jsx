import React from 'react'
// import TableGrid from './components/table-selection/TableGrid'
const SelectTable = () => {

    const initialTables = [
        { number: 1, isAvailable: true },
        { number: 2, isAvailable: false },
        { number: 3, isAvailable: true },
      ];


    // const [tables, setTables] = useState(initialTables);
    // // const [selectedTable, setSelectedTable] = useState(null);

    // const handleTableClick = (tableNumber) => {
    //     setSelectedTable(tableNumber);
    // };


    return (

        <div className="selection-container">
            <h2>Select your table:</h2>
            {/* <TableGrid tables={tables} onTableClick={handleTableClick}/> */}

        </div>
    )



}
export default SelectTable 
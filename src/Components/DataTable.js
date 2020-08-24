import React from 'react';
import './InventoryTable.css';

function DataTable(props) {
    const data = props.data.map(item => 
        <tr className="tableRow">
            <td>{item.x}</td>
            <td>{item.y}</td>
        </tr>
    )

    return (
        <table className="inventoryTable">
            <tr className="tableHeader">
                <th>Months</th>
                <th>Quantity</th>
            </tr>
            {data}
        </table>
    )
}

export default DataTable;
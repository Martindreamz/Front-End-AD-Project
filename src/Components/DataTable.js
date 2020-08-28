import React from 'react';
import './InventoryTable.css';

Date.prototype.getMonthName = function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[this.getMonth()];
}

function DataTable(props) {
    const data = props.data.map(item => 
        <tr className="tableRow">
            <td>{new Date().getMonthName() /*item.x*/}</td>
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
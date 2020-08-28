import React from 'react';
import { Bar } from 'react-chartjs-2';

Date.prototype.getMonthName = function (x) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[this.getMonth() - x];
}

class BarChart extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        const data = {
            labels: this.props.data.map((item, index) => new Date().getMonthName(index) /*item.x*/),
            datasets: [
                {
                    label: 'Bar Chart',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.props.data.map(item => item.y)
                }
            ]
        }


        return (
            <div>
                <Bar
                    data={data}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default BarChart;
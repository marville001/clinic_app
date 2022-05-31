import React from "react";
import Chart from "react-apexcharts";

const PatientsByDepartmentChart = ({labels, values}) => {
    const options = {
        chart: {
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: "22px",
                    },
                    value: {
                        fontSize: "16px",
                    },
                    total: {
                        show: true,
                        label: "Total",
                        formatter: function (w) {
                            let total = w.globals.initialSeries.reduce((acc, value)=>acc+value, 0)
                            return total;
                        },
                    },
                },
            },
        }
    };

    return (
        <div className="flex-1" id="chart">
            <Chart options={{...options, labels}} series={values} type="radialBar" height={300} />
        </div>
    );
};

export default PatientsByDepartmentChart;

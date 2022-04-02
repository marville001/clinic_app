import React from "react";
import Chart from "react-apexcharts";

const PatientsByDepartmentChart = () => {
    const series = [44, 77, 87, 83];
    const options = {
        chart: {
            height: 350,
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
        },
        labels: ["Apples", "Oranges", "Bananas", "Berries"],
    };

    return (
        <div className="flex-1" id="chart">
            <Chart options={options} series={series} type="radialBar" height={350} />
        </div>
    );
};

export default PatientsByDepartmentChart;

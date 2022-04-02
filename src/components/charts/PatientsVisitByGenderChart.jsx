import React from "react";

import Chart from 'react-apexcharts'

const PatientsVisitByGenderChart = () => {
    const series = [
        {
            name: "Male",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: "Female",
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: "Children",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
            ],
        },
        yaxis: {
            title: {
                text: "Patients",
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " Patients";
                },
            },
        },
    };

    return (
        <div className="flex-1" id="chart">
			<Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default PatientsVisitByGenderChart;
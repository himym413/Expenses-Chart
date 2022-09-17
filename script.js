"use strict";

// Getting data from data.json file
import jsonData from "./data.json" assert { type: "json" };

let daysArr = [];
let amountsArr = [];
let total = 0;
jsonData.forEach((el) => {
  daysArr.push(el.day);
  amountsArr.push(el.amount);
  total += el.amount;
});

// Total amount
let totalEl = document.querySelector(".total__number");
totalEl.textContent = "$" + total;

// Getting chart
const ctx = document.getElementById("myChart").getContext("2d");

Chart.defaults.font.size = 10;
Chart.defaults.font.family = "DM Sans, sans-serif";

const tooltipTitle = function () {
  return "";
};

const tooltipLabel = function (context) {
  if (!context) return;

  return "$" + context.raw;
};

// Background Color
const setBackground = function (index, b = "background") {
  if (b === "background")
    return new Date().getDay() === index + 1
      ? "hsl(186, 34%, 60%)"
      : "hsl(10, 79%, 65%)";

  if (b === "hover")
    return new Date().getDay() === index + 1
      ? "hsl(186, 50%, 80%)"
      : "hsl(10, 95%, 80%)";
};

let backgroundArr = [];
let hoverBackgroudArr = [];
for (let i = 0; i < 7; i++) {
  backgroundArr.push(setBackground(i));
  hoverBackgroudArr.push(setBackground(i, "hover"));
}

// Creating chart with chart.js
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: daysArr,
    datasets: [
      {
        data: amountsArr,
        backgroundColor: backgroundArr,
        hoverBackgroundColor: hoverBackgroudArr,
        borderRadius: "3",
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "hsl(28, 10%, 53%)",
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Spending - Last 7 Days",
        color: "hsl(25, 47%, 15%)",
        font: {
          size: 24,
          weight: 700,
        },
        align: "start",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 1)",
        caretSize: 0,
        padding: 8,
        displayColors: false,
        yAlign: "bottom",
        callbacks: {
          title: tooltipTitle,
          label: tooltipLabel,
        },
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
    },
  },
});

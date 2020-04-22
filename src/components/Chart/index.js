import React, { Component } from "react";
import Link from "next/link";
import Chart from "chart.js";
import Axios from "axios";
import { API } from "../../config/api";

class ChartComponent extends Component {
  chartRef = React.createRef();

  _chart = (data, color, border) => {
    let { name, key, amounts } = data;
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: key,
        datasets: [
          {
            label: `# of amounts`,
            data: amounts,
            backgroundColor: color,
            borderColor: border,
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: name,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  componentWillReceiveProps(nextProps) {
    let color = [];
    let border = [];
    let text = "rgba(54, 162, 235, 1)";
    let max = nextProps.data.key.length;
    for (let i = 0; i < max; i++) {
      let ran = this.getRandomInt(max);

      color.push(`rgba(${54 + ran}, ${162 + ran}, ${235 + ran}, 0.2)`);
      border.push(`rgba(${54 + ran}, ${162 + ran}, ${235 + ran}, 1)`);
    }
    this.setState({
      data: nextProps.data,
      color,
      border,
    });
    this._chart(nextProps.data, color, border);
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
export default ChartComponent;

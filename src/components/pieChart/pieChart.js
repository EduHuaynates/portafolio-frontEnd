import "./pieChart.css";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function pieChart({ tot }) {
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  // console.log(tot, "tot");
  const labels = tot.map(({ _id }) => {
    return [_id];
  });
  const values = tot.map(({ CapitalTotal }) => {
    return [CapitalTotal];
  });

  const bgColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const data = {
    labels: labels, // ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: values, //[12, 19, 3, 5, 2, 3],
        backgroundColor: bgColor,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false, position: "right" },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data * 1;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#36A2EB",
      },
    },
  };

  return (
    <div className="pieChart_Container">
      <div className="pieChart_Container2">
        <div className="pieChart_Wrapper">
          <p className="pieChart_Title">Distribución de Capital</p>
          <div className="pieChart_pie_container">
            <Doughnut data={data} options={options} />
          </div>
        </div>
        <div className="pieChart_Empresas_Container">
          {tot.map((empresa, i) => (
            <div key={i} className="pieChart_Empresas_Wrapper">
              <div className="pieChart_Empresa_Left">
                <div
                  style={{ backgroundColor: `${bgColor[i]}` }}
                  className="piechart_Empresa_circle"
                ></div>
                <div>{empresa._id}</div>
              </div>
              <div className="pieChart_Empresa_Right">
                {empresa.CapitalTotal}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

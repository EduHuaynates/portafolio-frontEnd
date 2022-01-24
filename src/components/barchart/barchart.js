import "./barChart.css";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const currentMonth = moment().format("YYYY-MM");

// console.log(
//   dataDummy.map((i) => {
//     return {
//       label: i.entidad,
//       data: monthArray.map((x, index) => {
//         let sumInte = 0;
//         i.detail.map((int) => {
//           sumInte += x === int.period ? int.interes * 1 : 0 * 1;
//         });
//         return sumInte;
//         console.log(sumInte, "SumInter", index);
//         // i  .detail[0].period == x[index] ? i.detail[index].interes : 0
//       }),
//       //  i.detail.map((x) => x.interes),
//       backgroundColor: i.color,
//     };
//   }),
//   "test"
// );
// // console.log(monthArray, "array Month");

// // const labels = monthArray;

export default function BarChart({ barChartData }) {
  const bgColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  console.log(barChartData, "barChartData");
  const barData = barChartData.map((inv, index) => {
    return {
      entidad: inv.entidad,
      detail: inv.schedule.map((sch) => {
        return {
          period: moment(sch.FechaPago, "D/MM/YYYY").format("YY-MM"),
          interes: sch.InteresRetornado,
        };
      }),
      color: bgColor[index],
    };
  });

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Intereses generados - Mes",
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (value > 0) {
            return value.toFixed(1);
          } else {
            return "";
          }
        },
      },
    },

    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const monthArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
    return moment().add(i, "months").format("YY-MM");
  });

  const data = {
    labels: monthArray,
    datasets: barData.map((i) => {
      return {
        label: i.entidad,
        data: monthArray.map((x, index) => {
          let sumInte = 0;
          i.detail.map((int) => {
            sumInte += x == int.period ? int.interes : 0;
          });
          return sumInte;
        }),
        backgroundColor: i.color,
      };
    }),
  };

  return (
    <div className="BarChart_Container">
      <Bar options={options} data={data} />
    </div>
  );
}

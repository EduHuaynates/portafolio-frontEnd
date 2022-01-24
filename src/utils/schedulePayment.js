import { RequiredFields } from "../utils/Error/schedule.error";
const moment = require("moment");

function createSchedule(
  capital,
  periodo,
  tasa,
  retornoInteres,
  retornoCapital,
  date
) {
  const schedule = new Array(periodo);
  console.log(date, "dateSchedule");
  // const dt = new Date(date);

  if (capital && periodo && tasa && retornoInteres && retornoCapital && date) {
    switch (retornoInteres + retornoCapital) {
      case "MensualMensual":
        for (var i = 0; i < periodo; i++) {
          schedule[i] = {
            Periodo: i + 1,
            CapitalRetornado: capital / periodo,
            InteresRetornado: ((capital - (capital * i) / periodo) * tasa) / 12,
            Cuota:
              capital / periodo +
              ((capital - (capital * i) / periodo) * tasa) / 12,
            Saldo: capital - (capital * (i + 1)) / periodo,
            Status: "Pendiente",
            FechaPago: new Date(
              moment(date, "YYYY-MM-DD").add(i + 1, "months")
            ).toLocaleDateString("es-ES"),

            // new Date(dt.setMonth(dt.getMonth() + 1)).toLocaleDateString(
            //   "es-ES"
            // ),

            //Date: dt.toLocaleDateString("en-US"),
          };
        }
        break;
      case "MensualFinal":
        for (var i = 0; i < periodo; i++) {
          schedule[i] = {
            Periodo: i + 1,
            CapitalRetornado: i === periodo - 1 ? capital : 0,
            InteresRetornado: (capital * tasa) / 12,
            Cuota: (i === periodo - 1 ? capital : 0) + (capital * tasa) / 12,
            Saldo: capital - (i === periodo - 1 ? capital : 0),
            Status: "Pendiente",
            FechaPago: new Date(
              moment(date, "YYYY-MM-DD").add(i + 1, "months")
            ).toLocaleDateString("es-ES"),
            // FechaPago: new Date(
            //   dt.setMonth(dt.getMonth() + 1)
            // ).toLocaleDateString("es-ES"),
          };
        }
        break;
      case "FinalFinal":
        for (var i = 0; i < periodo; i++) {
          schedule[i] = {
            Periodo: i + 1,
            CapitalRetornado: i === periodo - 1 ? capital * 1 : 0,
            InteresRetornado:
              i === periodo - 1 ? (capital * tasa * (i + 1)) / 12 : 0,
            Cuota:
              (i === periodo - 1 ? capital * 1 : 0) +
              (i === periodo - 1 ? (capital * tasa * (i + 1)) / 12 : 0),
            Saldo: capital - (i === periodo - 1 ? capital : 0),
            Status: "Pendiente",
            FechaPago: new Date(
              moment(date, "YYYY-MM-DD").add(i + 1, "months")
            ).toLocaleDateString("es-ES"),
            // FechaPago: new Date(
            //   dt.setMonth(dt.getMonth() + 1)
            // ).toLocaleDateString("es-ES"),
          };
        }
        break;
    }
  } else {
    throw new RequiredFields();
  }
  return schedule;
}

export default createSchedule;
// console.log(createSchedule(25000, 4, 0.03, "Mensual", "Mensual", "2021-12-30"));

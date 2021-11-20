import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import StatusBadge from "./statusBadge";

export default function Table() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const data = [
    ["Siembra", "10000 S/.", "24%", 12, "Running", 200],
    ["Carrillo", "15000 S/.", "36%", 12, "Waiting", 450],
    ["Eica Variable", "10000 S/.", , 12, "Waiting"],
    ["Eica Fijo", "3000 S/.", "22%", 10, "Waiting", 450],
    ["Inversiones.io", "5000 S/.", "19%", 5, "Running", 450],
    ["Inversiones.io", "5000 S/.", "20%", 2, "Running", 450],
    ["Biera Construccion", "15000 S/.", "38%", 12, "Running", 450],
  ];

  const columns = [
    {
      name: "Empresa",
      options: {
        filter: true,
      },
    },
    {
      name: "Capital",
      options: {
        filter: true,
      },
    },
    {
      name: "Tasa Anual",
      options: {
        filter: false,
      },
    },
    {
      name: "Periodo",
      options: {
        filter: true,
      },
    },
    {
      name: "Status",
      options: {
        filter: true,
        customBodyRender: (value) => <StatusBadge status={value} />,
        // sort: false,
      },
    },
    {
      name: "Interes Mensual",
      options: {
        filter: true,
        sort: false,
        // empty: true,
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={"Portafolio de Inversion EH"}
        data={data}
        columns={columns}
        options={options}
      />
      <StatusBadge status={"Running"}/>
    </ThemeProvider>
  );
}

import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import StatusBadge from "./statusBadge";
// import ModInvest from "../../views/modInvest";
import "./table.css";

export default function Table({ inv, closeModal, setModalData, setType }) {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const data = inv.map((i) => {
    return [
      i.empresa,
      i.capital,
      i.t_anual,
      i.periodo,
      i.status,
      i.i_mensual,
      i._id,
    ];
  });

  const onClickEdit = (rowdata) => {
    closeModal(true);
    // console.log(rowdata);
    setModalData({
      empresa: rowdata[0],
      capital: rowdata[1],
      t_anual: rowdata[2],
      periodo: rowdata[3],
      status: rowdata[4],
      i_mensual: rowdata[5],
      id_invest: rowdata[6]
    });
    setType(2);
  };

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
    {
      name: "Edit",
      options: {
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <button
              onClick={() => {
                onClickEdit(data[rowIndex.rowIndex]);
              }}
              className="table_edit_button"
            >
              <i className="fas fa-edit"></i>
            </button>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable data={data} columns={columns} options={options} />
      {/* <StatusBadge status={"Running"} /> */}
    </ThemeProvider>
  );
}

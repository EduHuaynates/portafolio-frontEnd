import MUIDataTable from "mui-datatables";
import { ThemeProvider, makeStyles } from "@mui/styles";
// import { createTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createTheme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import StatusBadge from "./statusBadge";
import "./table.css";

export default function TablePortafolio({
  inv,
  closeModal,
  setModalData,
  setType,
}) {
  // const useStyles = makeStyles({
  //   // MuiTableHead: {
  //   //   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   // },

  //   MuiTableHead: {
  //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   },
  //   MUIDataTable: {
  //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   },
  // });

  // const classes = useStyles();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#006400",
      },
      secondary: {
        main: "#ffa500",
      },

      // MUIDataTableSelectCell: {
      //   expandDisabled: {
      //     visibility: "hidden",
      //   },
      // },
      // MuiTableHead: {
      //   root: {
      //     backgroundColor: "#F00",
      // root:{
      //   backgroundColor:"#F00"
      // }
      // },
      // },
    },
  });

  const data = inv.map((i) => {
    return [
      // i.fecha,
      // new Date(i.fecha).toLocaleDateString("es-ES"),
      new Date(i.fecha)
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/"),
      i.entidad,
      i.empresa,
      i.retornoInteres,
      i.retornoCapital,
      i.capital,
      // (i.t_anual * 100).toFixed(1) + " %",
      i.t_anual,
      i.periodo,

      i._id,
      i.schedule,
    ];
  });

  // console.log(data, "data in table");

  const onClickEdit = (rowdata) => {
    closeModal(true);
    setModalData({
      //fecha: new Date(rowdata[0]).toLocaleDateString("fr-CA"),
      fecha: rowdata[0].split("/").reverse().join("-"),
      // fecha: new Date('12/14/2021').toISOString().slice(0, 10),
      // fecha: '2021-12-09',
      entidad: rowdata[1],
      empresa: rowdata[2],
      retornoInteres: rowdata[3],
      retornoCapital: rowdata[4],
      capital: rowdata[5],
      t_anual: rowdata[6],
      periodo: rowdata[7],
      id_invest: rowdata[8],
    });
    setType(2);
  };

  const columns = [
    {
      name: "Fecha",
      options: {
        filter: true,
      },
    },
    {
      name: "Entidad",
      options: {
        filter: true,
      },
    },
    {
      name: "Empresa",
      options: {
        filter: true,
      },
    },
    {
      name: "Retorno Interes",
      options: {
        filter: true,
      },
    },
    {
      name: "Retorno Capital",
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
    print: false,
    selectableRows: "none",
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <TableCell colSpan={7}>
          <Box sx={{ marginLeft: "15%", marginBottom: 5, marginTop: 2 }}>
            <h3 style={{ marginBottom: "10px" }}>Cronograma de Pago</h3>
            <TableRow>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Periodo
              </TableCell>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Fecha Pago
              </TableCell>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Cuota
              </TableCell>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Interes Mensual
              </TableCell>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Capital
              </TableCell>
              <TableCell
                colSpan={1}
                style={{ backgroundColor: "#D6E8F5", color: "#198BDE" }}
              >
                Saldo
              </TableCell>
            </TableRow>

            {data[rowMeta.rowIndex][9].map((sched, key) => {
              return (
                <TableRow key={key}>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.Periodo}
                  </TableCell>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.FechaPago}
                  </TableCell>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.Cuota.toFixed(2)}
                  </TableCell>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.InteresRetornado.toFixed(2)}
                  </TableCell>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.CapitalRetornado.toFixed(2)}
                  </TableCell>
                  <TableCell
                    style={{ padding: "8px 16px", textAlign: "center" }}
                    colSpan={1}
                  >
                    {sched.Saldo.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </Box>
        </TableCell>
      );
    },
    // onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) =>
    //   console.log(curExpanded, allExpanded, rowsExpanded),
  };

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        // className={classes.MuiTableHead}
        data={data}
        columns={columns}
        options={options}
        title={"Portafolio EH"}
      />
    </ThemeProvider>
  );
}

import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useMemo } from "react";
import "./table2.css";
import StatusBadge from "./statusBadge";

export default function ScheduleTable({ scheduleData }) {
  const dataFormatted = scheduleData.map((i) => {
    return {
      ...i,
      Cuota: i.Cuota.toFixed(2),
      CapitalRetornado: i.CapitalRetornado.toFixed(2),
      InteresRetornado: i.InteresRetornado.toFixed(2),
      Saldo: i.Saldo.toFixed(2),
    };
  });
  //   console.log(dataFormatted, "schedule");

  const data = useMemo(() => dataFormatted, [scheduleData]);
  const columns = useMemo(
    () => [
      {
        Header: "Periodo",
        accessor: "Periodo",
      },
      {
        Header: "Vencimiento",
        accessor: "FechaPago",
      },
      {
        Header: "Cuota",
        accessor: "Cuota",
      },
      {
        Header: "Interes Retornado",
        accessor: "InteresRetornado",
      },
      {
        Header: "Capital Retornado",
        accessor: "CapitalRetornado",
      },
      {
        Header: "Saldo",
        accessor: "Saldo",
      },
      {
        Header: "Estado",
        accessor: "Status",
      },
    ],
    []
  );
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Estado",
        Header: "Estado",
        Cell: ({ row }) => {
          return <StatusBadge status={row.values.Status} />;
        },
      },
      {
        id: "FechaPagoReal",
        Header: "Fecha Pago Real",
        Cell: ({ row }) => {
          return (
            <input
              className="input_fecha_pago_real"
              type="date"
              defaultValue=""
            />
          );
        },
      },
    ]);
  };

  const tableInstance = useTable(
    { columns, data },
    // useGlobalFilter,
    tableHooks,
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (idx) => idx % 2 === 0;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              className={isEven(idx) ? "table_even_class" : ""}
            >
              {row.cells.map((cell, idx) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

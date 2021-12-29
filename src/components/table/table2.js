import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useMemo } from "react";
import "./table2.css";

export default function Table2({ inv, closeModal, setModalData, setType }) {
  //   console.log(inv, "inv");
  const invDate = inv.map((i) => {
    return {
      ...i,
      fecha: new Date(i.fecha)
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/"),
    };
  });
  //   console.log(invDate, "invDate");
  const data = useMemo(() => invDate, [inv]);

  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "Entidad",
        accessor: "entidad",
      },
      {
        Header: "Empresa",
        accessor: "empresa",
      },
      {
        Header: "Capital",
        accessor: "capital",
      },
    ],
    []
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button
            className="table-edit-btn"
            onClick={() => {
              const investRow = row.allCells[row.id].row.original;
              closeModal(true);
              setModalData({
                fecha: investRow.fecha.split("/").reverse().join("-"),
                entidad: investRow.entidad,
                empresa: investRow.empresa,
                retornoInteres: investRow.retornoInteres,
                retornoCapital: investRow.retornoCapital,
                capital: investRow.capital,
                t_anual: investRow.t_anual,
                periodo: investRow.periodo,
                id_invest: investRow._id,
                schedule: investRow.schedule,
              });
              setType(2);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        ),
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
  //   console.log(headerGroups, "headerGroups");

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

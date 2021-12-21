import "./rowTable.css";

export default function RowTable({ inv, closeModal, setModalData, setType }) {
  const onClickEdit = (rowdata) => {
    closeModal(true);
    setModalData({
      //fecha: new Date(rowdata[0]).toLocaleDateString("fr-CA"),
      fecha: (rowdata.fecha).split("/").reverse().join("-"),
      // fecha: new Date('12/14/2021').toISOString().slice(0, 10),
      // fecha: '2021-12-09',
      entidad: rowdata.entidad,
      empresa: rowdata.empresa,
      retornoInteres: rowdata.retornoInteres,
      retornoCapital: rowdata.retornoCapital,
      capital: rowdata.capital,
      t_anual: rowdata.t_anual,
      periodo: rowdata.periodo,
      id_invest: rowdata.id_invest,
    });
    setType(2);
  };

  return (
    <div className="rowTable_wrapper">
      <div className="rowTable_header_wrapper">
        <div className="rowTable_item_cell">Fecha</div>
        <div className="rowTable_item_cell">Entidad</div>
        <div className="rowTable_item3_cell">Empresa</div>
        <div className="rowTable_item1_cell">Actions</div>
        {/*<div className="rowTable_item_cell">Ret. Capital</div>
         <div className="rowTable_item_cell">Capital</div>
        <div className="rowTable_item_cell">Tasa Anual</div>
        <div className="rowTable_item_cell">Periodo</div> */}
      </div>
      <div className="rowTable_all_items_wrapper">
        {inv.map((i) => {
          return (
            <div className="rowTable_item_wrapper">
              <div className="rowTable_item_cell">
                {new Date(i.fecha)
                  .toISOString()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("/")}
              </div>
              <div className="rowTable_item_cell">{i.entidad}</div>
              <div className="rowTable_item3_cell">{i.empresa}</div>
              <div className="rowTable_item1_cell">
                <button
                  className="btn_action_table"
                  onClick={() => onClickEdit(i)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn_action_table">
                  <i className="fas fa-eye"></i>
                </button>
              </div>
              {/*<div className="rowTable_item_cell">{i.retornoCapital}</div>
             <div className="rowTable_item_cell">{i.capital}</div>
            <div className="rowTable_item_cell">{i.t_anual}</div>
            <div className="rowTable_item_cell">{i.periodo}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

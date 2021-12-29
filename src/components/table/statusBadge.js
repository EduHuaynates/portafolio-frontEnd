import "./statusBadge.css";
export default function StatusBadge({ status }) {
  return (
    <>
      {status == "Pendiente" && <p className="statusPendiente"> Pendiente </p>}
      {status === "Pagado" && <p className="statusPagado"> Pagado</p>}
      {status === "Vencido" && <p className="statusVencido"> Vencido</p>}
    </>
  );
}

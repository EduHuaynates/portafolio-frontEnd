import "./statusBadge.css";
export default function StatusBadge({ status }) {
  return (
    <>
      {status == "Completado" && <p className="statusRunning"> Completado </p>}
      {status === "En Marcha" && <p className="statusWaiting"> En Marcha</p>}
      {status === "Retraso" && <p className="statusDelayed"> Retraso</p>}
    </>
  );
}

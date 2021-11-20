import "./statusBadge.css";
export default function StatusBadge({ status }) {
  return (
    <>
      {status == "Running" && <p className="statusRunning"> Completed </p>}
      {status === "Waiting" && <p className="statusWaiting"> Waiting</p>}
    </>
  );
}

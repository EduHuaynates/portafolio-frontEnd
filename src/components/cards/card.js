import "./card.css";

export default function card({ title, kpi }) {
  return (
    <div className="card_container">
      <p className="card_title"> {title}</p>
      <span className="card_kpi"> {kpi}</span>
    </div>
  );
}

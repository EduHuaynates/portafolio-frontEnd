import "./card.css";

export default function card({ title, kpi, color, fontColor, classIcon }) {
  return (
    <div style={{ backgroundColor: color }} className="card_container">
      <div className="cardHeadContainer">
        <i style={{ color: fontColor }} className={classIcon}></i>
        <p style={{ color: fontColor }} className="card_title">
          {title}
        </p>
      </div>
      <span style={{ color: fontColor }} className="card_kpi">
        {kpi}
      </span>
    </div>
  );
}

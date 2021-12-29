import "./timeLine.css";

export default function TimeLine({ payDays }) {
//   console.log(payDays, "timeline Pay");
  return (
    <div className="TimeLine_Wrapper">
      <div className="TimeVertical_Line"></div>
      <div className="TimeLine_Title"> Próximos Pagos</div>
      <div className="TimeLine_Payment_Container">
        {payDays.map((singleDate, i) => {
          return (
            <div key={i} className="TimeLine_Payment">
              <div className="TimeLine_Header">
                {singleDate[1][0].fechaPago}
              </div>
              <div className="TimeLine_Body">
                {singleDate[0]} - S./ {singleDate[1][0].Cuota.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import Calendar from "react-calendar";
import { useState } from "react";
import TimeLine from "../timeLine/timeLine";
import moment from "moment";
// import { createPost } from "../../../../api/sources/posts/post.controller";

export default function PaymentCalendar({ paymentDays }) {
  const [value, onChange] = useState(new Date());

  const payDays = paymentDays
    .map((i) => {
      return i.schedule.map((sch) => {
        return moment(sch.FechaPago, "DD/MM/YYYY").format("DD-MM-YYYY");
      });
    })
    .flat();

  const payDays2 = paymentDays.map((i) => {
    return [
      i.entidad,
      i.schedule
        .filter((sc) => {
          return sc.Periodo == 1;
        })
        .map((sch) => {
          return {
            fechaPago: moment(sch.FechaPago, "DD/MM/YYYY").format(
              "MMM DD, YYYY"
            ),
            Cuota: sch.Cuota,
          };
          // return sch.FechaPago;
        }),
    ];
  });
  //   console.log(payDays3, "payDays3");

  //   const payDays3 = paymentDays.map((i) => {
  //     return i.schedule
  //       .filter((sc) => {
  //         return sc.Periodo == 1;
  //       })
  //       .map((sch) => {
  //         return {
  //           fechaPago: moment(sch.FechaPago, "DD/MM/YYYY").format("MMM DD, YYYY"),
  //           Cuota: sch.Cuota,
  //         };
  //         // return sch.FechaPago;
  //       });
  //   });

  //   console.log(payDays2, "payDays2");

  return (
    <div className="calendar_Wrapper">
      {/* {payDays ? ( */}
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          // console.log(moment(date).format("DD-MM-YYYY"), "date");
          if (payDays.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
            // return "highlight gren";
            return "highlight";
          }
        }}
        // tileContent={
        //   ({ date, view }) =>
        //     // console.log(view, "view");
        //     mark.find((x) => x === moment(date).format("DD-MM-YYYY")) ? (
        //       <p className="">Hoy pagan!!</p>
        //     ) : null

        //   //   view === "month" && date.getDay() === 0 ? <p>It's Sunday!</p> : null
        // }
        // tileDisabled={({ date }) => date.getDay() === 0}
        /*maxDate={new Date(2020, 1, 0)}</div>*/
        // minDate={new Date()}
      />
      <TimeLine payDays={payDays2} />
    </div>
  );
}

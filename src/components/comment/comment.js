import { useState } from "react";
import "./comment.css";

export default function Comment({ type, isvisible }) {
  return isvisible ? (
    type === "NEW" ? (
      <div className="comment_container">
        <img
          className="avatar_image reply_icon"
          src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <form action="" className="comment_form_send">
          <div
            className="comment_new_reply"
            contentEditable
            data-text="Ingrese un comentario...."
          ></div>
        </form>
        <button className="send_comment_btn" type="submit">
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    ) : (
      <div className="comment_container">
        <img
          className="avatar_image reply_icon"
          src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <div className="comment_body">
          <span className="comment_reply_user"> Ivo Huaynates</span>
          <p className="comment_reply">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            facere blanditiis doloribus perferendis repudiandae officia enim,
            dolorum ad beatae ut sapiente quasi, ipsam atque. Eligendi error
            esse dicta ullam veniam?
          </p>
        </div>
      </div>
    )
  ) : (
    ""
  );
}

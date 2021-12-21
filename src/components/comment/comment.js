import { useState } from "react";
import "./comment.css";
import Moment from "react-moment";

export default function Comment({
  type,
  isvisible,
  comment,
  sendComment,
  getComments,
  postId,
}) {
  const [newResponseMessage, setNewResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enviado =await sendComment(newResponseMessage);
    console.log(enviado,'enviado')
    setNewResponseMessage("");
    await getComments(postId);
  };

  const handleInputChange = (e) => {
    setNewResponseMessage(e.target.value);
  };

  return isvisible ? (
    type === "NEW" ? (
      <div className="comment_container">
        <img
          className="avatar_image reply_icon"
          src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />

        <form onSubmit={handleSubmit} className="comment_form_send">
          <input
            className="comment_new_reply"
            type="text"
            placeholder="Ingrese un comentario...."
            onChange={handleInputChange}
            value={newResponseMessage}
          />
          <button className="send_comment_btn" type="submit">
            <i className="fas fa-angle-double-right"></i>
          </button>
        </form>
      </div>
    ) : (
      <div className="comment_container">
        <img
          className="avatar_image reply_icon"
          src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <div className="comment_main">
          <div className="comment_header">
            <span className="comment_reply_user"> Ivo Huaynates</span>
            <p className="comment_timeAgo">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>
              {" ago"}
            </p>
          </div>
          <p className="comment_reply">{comment.Message}</p>
        </div>
      </div>
    )
  ) : (
    ""
  );
}

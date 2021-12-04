import "./post.css";
import Comment from "../comment/comment";
import { useState } from "react";

export default function Post() {
  const [visibleComments, setVisibleCommets] = useState(false);

  const handleVisibleComment = () => {
    setVisibleCommets(() => !visibleComments);
  };
  return (
    <div className="post_container">
      <div className="post_header">
        <div className="post_header_avatar">
          <img
            className="avatar_image"
            src="https://yt3.ggpht.com/ytc/AKedOLRxPWwhGyi0FPMLqQsV0opQ59lMBwESKl65ihFfeQ=s900-c-k-c0x00ffffff-no-rj"
            alt=""
          />
          <p className="avatar_username">Edu Huaynates</p>
        </div>
        <div className="post_header_date">
          <p>2 days ago</p>
        </div>
      </div>

      <div className="post_body">Alguna vez se demoro en pagar?</div>
      <div className="post_footer">
        <div className="post_count">
          <button className="post_show_comments" onClick={handleVisibleComment}>
            <i className="fas fa-comment icon" />
            21 Comments
          </button>
        </div>
        <div className="post_view">
          <i className="fas fa-eye icon" /> 99 Views
        </div>
      </div>

      <div
        className={
          visibleComments
            ? "post_comment_container active"
            : "post_comment_container"
        }
      >
        <Comment type={"NEW"} isvisible={visibleComments} />
        <Comment isvisible={visibleComments} />
        <Comment isvisible={visibleComments} />
        <Comment isvisible={visibleComments} />
      </div>
    </div>
  );
}

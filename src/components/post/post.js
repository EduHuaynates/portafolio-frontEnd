// STYLES
import "./post.css";

// HOOKS
import { useState, useEffect } from "react";

//COMPONENTS
import Comment from "../comment/comment";
import Moment from "react-moment";
import Axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function Post({ type, sendPost, post, usuario }) {
  const [visibleComments, setVisibleCommets] = useState(false);
  const [message, setMessage] = useState("");

  const [loadComment, setLoadComment] = useState(true);
  const [comments, setComments] = useState();

  const notify = (promise) => {
    toast.promise(promise, {
      loading: "Loading",
      success: (data) => `Comentario Creado`,
      error: (err) => `${err.response.data.message}`,
    });
  };

  async function sendComment(message) {
    console.log(usuario, "user para comment");
    const Promise = Axios.post(`/api/comment/`, {
      Message: message,
      Post: post._id,
      User: usuario._id,
    });

    notify(Promise);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPost(message);
    setMessage("");
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  async function getComments(postId) {
    const { data } = await Axios.get(`/api/comment/${postId}`, {
      params: { Post: postId },
    });
    console.log(data, "Comentarios despues del get");
    setComments(data);
    setLoadComment(false);
    // console.log('GetComments Called')
    return data;
  }

  const handleVisibleComment = (postId) => {
    setVisibleCommets(() => !visibleComments);
    getComments(postId);
  };

  return type === "NEW" ? (
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
      </div>
      <div className="post_body_container">
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            className="new_post_body"
            type="text"
            // contentEditable
            placeholder="Ingrese una consulta...."
            onChange={handleInputChange}
            value={message}
          />
          <button type="submit" className="send_new_post">
            Enviar
          </button>
        </form>
      </div>
    </div>
  ) : (
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
          <p>
            <Moment fromNow ago>
              {post.createdAt}
            </Moment>{" "}
            ago
          </p>
        </div>
      </div>

      <div className="post_body">{post.Message}</div>
      <div className="post_footer">
        <div className="post_count">
          <button
            className="post_show_comments"
            onClick={() => handleVisibleComment(post._id)}
          >
            <i className="fas fa-comment icon" />
            {post.NumComments} Comments
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
        <Comment
          type={"NEW"}
          isvisible={visibleComments}
          sendComment={sendComment}
          getComments={getComments}
          postId={post._id}
        />

        {loadComment
          ? ""
          : comments.map((com, key) => {
              return (
                <Comment isvisible={visibleComments} comment={com} key={key} />
              );
            })}
      </div>
      <Toaster />
    </div>
  );
}

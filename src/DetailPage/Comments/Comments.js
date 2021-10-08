import "./Comments.css";
import { useEffect, useState } from "react";
import API from "../../API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../Context/AuthContext";
import dayjs from "dayjs";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";

const Comments = ({ targetStudent }) => {
  const [loading, setLoading] = useState(true);
  const { setLogin } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const commentLoaderCss = css`position: absolute; top: 165px; left: 125px`;

  useEffect(() => {
    setLoading(true);
    if (targetStudent.id === undefined){
    } else {
      API.get(`/student/${targetStudent.id}/comment`)
          .then((res) => {
            setComments(res.data.reverse());
            setLoading(false);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              toast.error("토큰이 만료되었습니다.");
              localStorage.setItem("isLogin", "no");
              localStorage.setItem("token", "none");
              setLogin(false);
            } else if (error.response.status === 400) {
              toast.error(error.response.data.message);
            } else {
              toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
            }
            setLoading(false);
          });
    }
  }, [newComment, targetStudent]);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addComments = () => {
    setLoading(true);
    API.post(`/student/${targetStudent.id}/comment`, { content: newComment })
      .then((res) => {
        toast.success("댓글을 작성하였습니다.");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("토큰이 만료되었습니다.");
          localStorage.setItem("isLogin", "no");
          localStorage.setItem("token", "none");
          setLogin(false);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        setLoading(false);
      });
    setNewComment("");
  };

  return (
    <>
      <p className="commentHeader">코멘트</p>
      <div className="commentBox">
        <BounceLoader
            color="#88dd88"
            loading={loading}
            size={100}
            sizeUnit={"px"}
            css={commentLoaderCss}
        />
        <ul className="comments">
          {comments.map((item) => (
            <li key={item.id} className="comment">
              <p className="commentContents">{item.content}</p>
              <p className="commentTime">
                {dayjs(item.datetime).format("MM월 DD일 HH시 mm분")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="commentInputLine">
        <input
          value={newComment}
          onChange={(e) => handleNewComment(e)}
          className="commentInput"
          onKeyPress={ (e) => {
            if (e.key === 'Enter') {
              addComments();
            }}}
        />
        <button onClick={addComments} className="commentInputButton">
          작성
        </button>
      </div>
    </>
  );
};

export default Comments;

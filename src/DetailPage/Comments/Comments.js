import "./Comments.css";
import {useEffect, useRef, useState} from "react";
import API from "../../API";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import {useAuthContext} from "../../Context/AuthContext";

const Comments = ({targetStudent}) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [commentLeft, setCommentLeft] = useState(true);
  const commentsRef = useRef(null);
  const { tokenExpire } = useAuthContext();
  const commentLoaderCss = css`
    position: absolute;
    top: 165px;
    left: 125px;
  `;

  useEffect(() => {
    if (targetStudent.id !== undefined) {
      getFirstPage();
    }
  }, [targetStudent]);

  const getFirstPage = () => {
    setLoading(true);
    commentsRef.current.scrollTo(0, 0);
    API.get(`/student/${targetStudent.id}/comment`, {params: {page : 1}})
      .then((res) => {
        setComments(res.data.data);
        if (res.data.next === null){
          setCommentLeft(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401){
          tokenExpire();
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        setLoading(false);
      });
  };

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = async () => {
    try {
      await API.post(`/student/${targetStudent.id}/comment`, {
        content: newComment,
      });
      await getFirstPage();
    } catch (error) {
      if (error.response.status === 401){
        tokenExpire();
      } else {
        toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
      }
    }
    setNewComment("");
  };

  const extendComments = async () => {
    try {
      console.log(commentLeft);
      const response = await API.get(
        `/student/${targetStudent.id}/comment?page=${pageNum+1}`
      );
      if (response.data.next === null) {
        setCommentLeft(false);
      }
      if (response.data.data.length !== 0){
        setComments([...comments, ...response.data.data]);
      }
    } catch (error) {
      if (error.response.status === 401){
        tokenExpire();
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
      }
    }
  };

  const handleScroll = () => {
    const scrollHeight = commentsRef.current.scrollHeight;
    const scrollTop = commentsRef.current.scrollTop;
    const clientHeight = commentsRef.current.clientHeight;
    if (commentLeft && scrollTop + clientHeight >= scrollHeight-200) {
      extendComments();
      setPageNum(pageNum+1);
    }
  };

  return (
    <>
      <p className="commentHeader">코멘트</p>
      <div className="commentBox">
        <BounceLoader
          color="#88dd88"
          loading={loading}
          size={100}
          css={commentLoaderCss}
        />
        <ul ref={commentsRef} className="comments" onScroll={handleScroll}>
          {comments.map((item) => (
            <li key={item.id} className="comment">
              <p className="commentContents">{item.content}</p>
              <p className="commentTime">
                {dayjs(item.dateTime).format("MM월 DD일 HH시 mm분")}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="commentInputLine">
        <input
          value={newComment}
          onChange={handleNewComment}
          className="commentInput"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addComment();
            }
          }}
          disabled={targetStudent.locked}
        />
        <button onClick={addComment} className="commentInputButton">
          작성
        </button>
      </div>
    </>
  );
};

export default Comments;

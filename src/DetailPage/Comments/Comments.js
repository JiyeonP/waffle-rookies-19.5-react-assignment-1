import "./Comments.css";
import { useStudentContext } from "../../Context/StudentContext";

const Comments = () => {
  const { setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext();

  return (
    <div>
      <p className="commentHeader">코멘트</p>
      <div className="commentBox">내용이 없습니다.</div>
    </div>
  );
};

export default Comments;

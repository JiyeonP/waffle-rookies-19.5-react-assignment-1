import "./Comments.css";
import { useStudentContext } from "../../Context/StudentContext";

const Comments = () => {
    const {studentList, setStudentList, selectedStudent, setSelectedStudent} =
        useStudentContext();

    return (
        <div>
            <div className="commentHeader">
                코멘트
            </div>
            <div className="commentBox">
                내용이 없습니다.
            </div>
        </div>
    )
}

export default Comments;
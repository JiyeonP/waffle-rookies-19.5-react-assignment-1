import "./DeleteConfirm.css";
import { useStudentContext } from "../../Context/StudentContext";
import { useHistory } from "react-router-dom";

const DeleteConfirm = ({ deleteClicked, handleDelete }) => {
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext();

  const history = useHistory();

  const handleConfirm = () => {
    const newStudentList = studentList.filter(
      (item) => item.id !== selectedStudent.id
    );
    setStudentList(newStudentList);
    setSelectedStudent({
      id: false,
      name: false,
      grade: false,
      profileImg: false,
    });
    history.push("/students");
  };

  const handleClose = () => {
    handleDelete();
  };

  return (
    <div className={`wrapper ${deleteClicked ? "show" : ""}`}>
      <div className="backBox" onClick={handleConfirm} />
      <div className="ConfirmPage">
        <div className="warningLine">
          <img
          className="warningImage"
          src="https://cdn-icons-png.flaticon.com/512/1672/1672451.png"
          alt="주의 사진"/>
          <p className="warningMessage">학생을 삭제합니다.</p>
        </div>
        <p className="irreversibleMessage">이 작업은 되돌릴 수 없습니다.</p>
        <div>
          <button className="cancelButton" onClick={handleClose}>
            <img
              className="buttonImg"
              src="https://cdn-icons-png.flaticon.com/512/660/660252.png"
              alt="취소 사진"
            />
            <p className="buttonText">취소</p>
          </button>
          <button className="deleteButton" onClick={handleConfirm}>
            <img
              className="buttonImg"
              src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
              alt="삭제 사진"
            />
            <p className="buttonText">삭제</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;

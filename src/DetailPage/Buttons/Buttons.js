import "./Buttons.css";
import { useStudentContext } from "../../Context/StudentContext";
import { useHistory } from "react-router-dom";

const Buttons = ({ changedStudent, handleSave, handleDelete, handleLock }) => {
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } = useStudentContext();

  const history = useHistory();

  const goStudentList = () => history.push("/students");

  return (
    <div className="header">
      <button className="backToListButton" onClick={goStudentList}>
        <img
          className="buttonImg"
          src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
          alt="왼쪽 화살표"
        />
        <p className="buttonText"> 학생 목록 페이지로 </p>
      </button>
      {changedStudent.locked ? (
        <button className={`defaultButton ${"lock"}`} onClick={handleLock}>
          <img
            className="buttonImg"
            src="https://cdn-icons-png.flaticon.com/512/597/597356.png"
            alt="해제"
          />
          <p className="buttonText">해제</p>
        </button>
      ) : (
        <button className={`defaultButton ${"lock"}`} onClick={handleLock}>
          <img
            className="buttonImg"
            src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
            alt="잠금"
          />
          <p className="buttonText">잠금</p>
        </button>
      )}
      <button
        className={`defaultButton ${!changedStudent.locked ? "delete" : ""}`}
        onClick={!changedStudent.lock ? handleDelete : null}
      >
        <img
          className="buttonImg"
          src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
          alt="삭제"
        />
        <p className="buttonText">삭제</p>
      </button>
      <button
        className={`defaultButton ${!changedStudent.locked ? "save" : ""}`}
        onClick={!changedStudent.lock ? handleSave : null}
      >
        <img
          className="buttonImg"
          src="https://cdn-icons-png.flaticon.com/512/108/108174.png"
          alt="저장"
        />
        <p className="buttonText">저장</p>
      </button>
    </div>
  );
};

export default Buttons;

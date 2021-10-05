import "./Buttons.css";
import { Link, useHistory } from "react-router-dom";

const Buttons = ({ changedStudent, handleCancel, handleSave, handleConfirm, handleLock }) => {
  const history = useHistory();

  const goStudentList = () => history.push("/students");

  return (
    <div className="header">
      <button className="backToListButton" onClick={goStudentList}>
        <img
          className="goBackImg"
          src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
          alt="왼쪽 화살표"
        />
        <Link className="goBackText" to="/students">
          {" "}
          학생 목록 페이지로{" "}
        </Link>
      </button>
      {changedStudent.locked ? (
        <button className="defaultButton lock" onClick={handleLock}>
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
          className={`defaultButton ${!changedStudent.locked ? "cancel" : ""}`}
        onClick={!changedStudent.locked ? handleCancel : null}
      >
        <img
          className="buttonImg"
          src="https://cdn-icons-png.flaticon.com/512/60/60690.png"
          alt="취소"
        />
        <p className="buttonText">취소</p>
      </button>
      <button
        className={`defaultButton ${!changedStudent.locked ? "delete" : ""}`}
        onClick={!changedStudent.locked ? () => handleConfirm(true) : null}
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
        onClick={!changedStudent.locked ? handleSave : null}
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

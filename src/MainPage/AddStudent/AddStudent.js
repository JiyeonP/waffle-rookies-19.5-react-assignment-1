import "./AddStudent.css";
import { useEffect, useState } from "react";
import { useStudentContext } from "../../Context/StudentContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../API";

const AddStudent = ({ addStudent, handleAddStudent }) => {
  const { setSelectedStudentId, setLoading } = useStudentContext();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [profile_img, setProfileImg] = useState("");

  const handleStudentAdd = () => {
    API.post("/student", {
      name: name,
      grade: Number(grade),
    })
      .then((res) => {
        setSelectedStudentId(res.data.id);
        handleClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleClose = () => {
    handleAddStudent(false);
    setName("");
    setGrade("");
    setProfileImg("");
  };

  return (
    <div className={`wrapper ${addStudent ? "show" : ""}`}>
      <div className="backBox" onClick={handleClose} />
      <div className="studentAddPage">
        <div className="addLine">
          <p className="addIndex">이름</p>
          <input
            className="addInput"
            placeholder="이름을 입력하세요. (한글)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addLine">
          <p className="addIndex">학년</p>
          <input
            className="addInput"
            placeholder="학년을 입력하세요. (숫자)"
            type="number"
            min="1"
            max="3"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <button className="close" onClick={handleClose}>
          닫기
        </button>
        <button className="add" onClick={handleStudentAdd}>
          추가
        </button>
      </div>
    </div>
  );
};

export default AddStudent;

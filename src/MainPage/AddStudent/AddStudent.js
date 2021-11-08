import "./AddStudent.css";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../API";
import { useAuthContext } from "../../Context/AuthContext";

const AddStudent = ({
  setSelectedStudentId,
  addStudent,
  handleAddStudent,
  studentList,
  setStudentList,
}) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [profile_img, setProfileImg] = useState("");
  const { tokenExpire } = useAuthContext();

  const handleStudentAdd = () => {
    API.post("/student", {
      name: name,
      grade: Number(grade),
    })
      .then((res) => {
        setStudentList(
            studentList.concat({ id: res.data.id, name: name, grade: Number(grade), profile_img:"" })
        );
        setSelectedStudentId(res.data.id);
        handleClose();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          tokenExpire();
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleStudentAdd();
              }
            }}
          />
        </div>
        <div className="addLine">
          <p className="addIndex">학년</p>
          <input
            className="addInput"
            placeholder="학년을 입력하세요. (숫자)"
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleStudentAdd();
              }
            }}
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

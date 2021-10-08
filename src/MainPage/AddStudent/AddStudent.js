import "./AddStudent.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../API";
import "react-toastify/dist/ReactToastify.css";
import {useAuthContext} from "../../Context/AuthContext";

const AddStudent = ({ setSelectedStudentId, addStudent, handleAddStudent }) => {
  const {setLogin} = useAuthContext();
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
        if (error.response.status === 401) {
          toast.error("토큰이 만료되었습니다.");
          localStorage.setItem("isLogin", "no");
          localStorage.setItem("token", "none");
          setLogin(false);
        } else if (error.response.status === 400){
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
            onKeyPress={ (e) => {
              if (e.key === 'Enter') {
                handleStudentAdd();
              }}}
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
            onKeyPress={ (e) => {
              if (e.key === 'Enter') {
                handleStudentAdd();
              }}}
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
